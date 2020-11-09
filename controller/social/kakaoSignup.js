const axios = require('axios');
axios.defaults.withCredentials = true;
const { user } = require('../../models');
const qs = require('qs');
require('dotenv').config();
const session = require('express-session');

module.exports = {
  get: async (req, res) => {
    const clientID = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;
    const redirectUri = process.env.KAKAO_REDIRECT_URI;
    const code = req.query.code;
    const main = 'http://localhost:3000';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    if (code === undefined) {
      res.redirect(kakaoAuthUrl);
    }
    console.log('코드', code);
    console.log('세션', session);
    try {
      tokenResponse = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          grant_type: 'authorization_code',
          client_id: clientID,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        }),
      });

      const access_token = tokenResponse.data;
      userResponse = await axios({
        method: 'POST',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token.access_token}`,
        },
        data: {
          property_keys: ['kakao_account.email'],
        },
      });
      const user_data = userResponse.data;
      console.log('엑세스토큰', access_token);
      console.log('유저', user_data);

      const login = (user) => {
        console.log('유저', user);
        if (user) {
          const access = jwt.sign(
            { account: user_data.kakao_account.email, gmt: Date.now() },
            process.env.ACCESS_SECRET,
            {
              expiresIn: '100m',
              issuer: 'nyam-nyamServer',
            }
          );
          const refresh = jwt.sign(
            { account: user_data.kakao_account.email, gmt: Date.now() },
            process.env.REFRESH_SECRET,
            {
              expiresIn: '10 days',
              issuer: 'nyam-nyamServer',
            }
          );
          const tokenGenerate = (access, refresh) => {
            let obj = {};
            obj['access_token'] = access;
            obj['refresh_token'] = refresh;
            return obj;
          };
          return tokenGenerate(access, refresh);
        }
      };
      const respond = (token) => {
        user
          .update(
            {
              access_token: token.access_token,
              refresh_token: token.refresh_token,
            },
            { where: { email: user_data.kakao_account.email } }
          )
          .then(() => {
            user
              .findOne({
                attributes: {
                  exclude: ['password', 'createdAt', 'updatedAt'],
                },
                where: { email: user_data.kakao_account.email },
              })
              .then(async (userdata) => {
                let { id } = userdata;
                console.log(id);

                //store 정보 받기
                let storedata = await store
                  .findAll({
                    attributes: {
                      exclude: ['userId', 'createdAt', 'updatedAt'],
                    },
                    where: { userId: id },
                  })
                  .then((data) => {
                    let result = [];
                    let storeArr = data.map((e) => {
                      result = e.dataValues;
                      return result;
                    });
                    return storeArr;
                  })
                  .catch((err) => console.log(err));

                return res.status(201).json({
                  message: 'logged in successfully',
                  userdata,
                  storedata,
                });
              })
              .catch((err) => console.log(err));
          });
      };

      const findUser = await user.findOne({
        where: {
          password: user_data.id,
          social: 'kakao',
        },
      });
      console.log('findUser', findUser);
      if (findUser) {
        user
          .findOne({
            where: {
              password: user_data.id,
              social: 'kakao',
            },
          })
          .then((data) => {
            console.log('데이터', data);
            login(data);
          })
          .then(respond)
          .catch((err) => {
            console.log('login error', err);
            return res.status(500).json({ 'login error': err });
          });
      } else {
        return res.status(302).send({
          message: '유저정보',
          userdata: {
            email: user_data.kakao_account.email,
            username: user_data.properties.nickname,
            userImg: user_data.properties.profile_image,
            social: 'kakao',
          },
        });
      }
    } catch (error) {
      console.log('에러', error.data);
    }
  },
};
