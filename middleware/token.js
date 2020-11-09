const tokenMiddleware = async (req, res, next) => {
  console.log(req.headers);
  const jwt = require('jsonwebtoken');
  const { user } = require('../models');
  require('dotenv').config();
  const access_token = req.headers['x-access-token'];
  const refresh_token = req.headers['x-refresh-token'];
  if (!refresh_token || !access_token) {
    console.log('refresh token이 없습니다');
    return res.status(404).json('잘못된 요청입니다. 토큰을 확인해주세요');
  }
  const decoded = jwt.decode(refresh_token, { complete: true });
  const userData = decoded.payload.account;

  //액세스토큰 만료 재확인하기
  const checkAccessToken = () => {
    const access = new Promise((resolve, reject) => {
      jwt.verify(
        access_token,
        process.env.ACCESS_SECRET,
        {
          expiresIn: '100m',
          issuer: 'nyam-nyamServer',
        },
        (err, decode) => {
          if (err) {
            reject(err);
          } else {
            resolve(decode);
            return res.status(200).json({
              message: 'access 문제없음',
              access_token: access_token,
            });
          }
        }
      );
    });
    return access;
  };
  //리프레시 토큰 만료 재확인하기
  const checkRefreshToken = () => {
    const refresh = new Promise((resolve, reject) => {
      jwt.verify(
        refresh_token,
        process.env.REFRESH_SECRET,
        {
          expiresIn: '10 days',
          issuer: 'nyam-nyamServer',
        },
        (err, decode) => {
          if (err) {
            reject(err);
          } else {
            console.log('refresh');
            resolve(decode);
            //return res.status(200).json('refresh 문제없음');
          }
        }
      );
    });
    return refresh;
  };
  //액세스 토큰 에러 메세지
  const onAccessError = (error) => {
    console.log('여기인건가~~~~');
    if (error.message === 'jwt expired') {
      console.log('auth access error', error.message);
      //checkRefreshToken().catch(onRefreshError);
    } else {
      return res.status(403).json({ 'token 유효성 에러': error.message });
    }
  };
  //refresh 토큰 에러
  const onRefreshError = async (error) => {
    console.log('여기인건가~~~~ refresh', error);
    if (error.account === userData || error.message === 'jwt expired') {
      console.log('auth refresh');
      let check = await user.findOne({ where: { email: userData } });
      if (check) {
        return userData;
      } else {
        return res.status(404).send('user 정보가 없습니다');
      }
    } else {
      return res.status(403).json({ 'token 유효성 에러': error.message });
    }
  };
  //토큰 유효성 확인후 발급하기
  const generateToken = (user) => {
    const access = jwt.sign(
      { account: user, gmt: Date.now() },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '100m',
        issuer: 'nyam-nyamServer',
      }
    );
    const refresh = jwt.sign(
      { account: user, gmt: Date.now() },
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
      obj['decoded'] = user;
      return obj;
    };
    return tokenGenerate(access, refresh);
  };
  //발급한 토큰들을 db 업뎃후 응답 보내기
  const respond = (token) => {
    console.log('token', token);
    user
      .update(
        {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        },
        { where: { email: token.decoded } }
      )
      .then(() => {
        user
          .findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: { email: userData },
          })
          .then((userdata) => {
            console.log(userdata.dataValues);
            console.log('token이 만료되어 업뎃하였습니다');
            return res.status(201).json({
              access_token: userdata.dataValues.access_token,
              refresh_token: userdata.dataValues.refresh_token,
            });
          })
          .catch((err) => {
            console.log('update 후 찾는데 오류', err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => res.json({ 'token update 오류': err }));
  };

  await checkAccessToken().catch(onAccessError);
  await checkRefreshToken()
    .then(onRefreshError)
    .then((data) => generateToken(data))
    .then((data) => respond(data));
  //next();
};
module.exports = tokenMiddleware;
