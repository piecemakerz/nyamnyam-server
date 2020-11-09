const dotenv = require('dotenv');
require('dotenv').config();
module.exports = {
  post: async (req, res) => {
    const { user } = require('../../models');
    const { store } = require('../../models');
    const jwt = require('jsonwebtoken');
    const { email, password } = req.body;

    if (
      req.body === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return res.status(400).send('유효하지 않은 요청입나다.');
    }

    const login = (user) => {
      if (user) {
        const access = jwt.sign(
          { account: email, gmt: Date.now() },
          process.env.ACCESS_SECRET,
          {
            //expiresIn: '1m',
            expiresIn: '100m',
            issuer: 'nyam-nyamServer',
          }
        );
        const refresh = jwt.sign(
          { account: email, gmt: Date.now() },
          process.env.REFRESH_SECRET,
          {
            //expiresIn: '1m',
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
      } else {
        console.log('user 정보가 없습니다');
        return res.status(404).send('user 정보가 없습니다');
      }
    };

    const respond = (token) => {
      user
        .update(
          {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
          },
          { where: { email: email } }
        )
        .then(() => {
          user
            .findOne({
              attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
              where: { email: email },
            })
            .then(async (userdata) => {
              let { id } = userdata;
              console.log(id);

              //store 정보 받기
              let storedata = await store
                .findAll({
                  attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
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

              return res.json({
                message: 'logged in successfully',
                userdata,
                storedata,
              });
            })
            .catch((err) => console.log(err));
        });
    };

    user
      .findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: { email: email, password : password },
      })
      .then(login)
      .then(respond)
      .catch((err) => {
        console.log('login error', err);
        return res.json({ 'login error': err });
      });
  },
};

// module.exports = {
//   post: async (req, res) => {
//     const { user } = require('../../models');
//     const { v4 } = require('uuid')
//     const jwt = require('jsonwebtoken')

//     console.log('login 들어왔음', typeof user)

//     if(
//       req.body === undefined ||
//       req.body.email === undefined ||
//       req.body.password === undefined) {
//         return res.status(400).send({stats: 'Invalid Request'});
//     }

//     const { email, password } = req.body
//     //const uuidNew = await v4();

//     //access token 만들어 응답하는 콜백 함수
//     const generateToken = (userData) => {
//       const payload = {account : email, gmt: Date.now()} //uuid: uuidNew,
//       const secert = process.env.ACCESS_SECRET;
//       const option = {
//         expiresIn : '15m',
//         issuer : 'nyam-nyamServer',
//       };
//       jwt.sign(payload, secert, option, (err, token) => {
//         if(err) console.log(err);
//         else{
//           //userData['token'] ? delete userData['token'] : false;
//           console.log('access userdata')
//           user.update({access_token: token}, {where: {email : email} } )
//             .then(() => {
//               console.log('access_token', token)
//               generateRefresh(userData)
//             })
//             .catch(err => {
//               console.log('access token 발행 문제')
//             })
//         }
//       })
//     }

//     //refresh token 만들어 응답하는 콜백 함수
//     const generateRefresh = (userData) => {
//       const payload = {account : email} //uuid: uuidNew,
//       const secert = process.env.REFRESH_SECRET;
//       const option = {
//         expiresIn : '14d',
//         issuer : 'nyam-nyamServer',
//       };
//       jwt.sign(payload, secert, option, (err, token) => {
//         if(err) console.log(err);
//         else{
//           //userData['token'] ? delete userData['token'] : false;
//           console.log('refresh 안에서')
//           user.update({refresh_token: token}, {where :{email : email}})
//             .then((userdata) => {
//               console.log('refresh_token', token)
//               console.log('refresh', userdata)
//               return res.status(200).json({
//                 userdata,
//                 stauts : 'Login Complete'
//               })
//             })
//             .catch(err => {
//               console.log('refrsh token 발행 문제',err)
//             })
//         }
//       })
//     }

//     await user
//       .findOne({
//         raw: true,
//         where : {
//           email : email,
//           password : password
//         }
//       })
//       .then(async(data) => {
//         if (data === null) {
//           return res.status(404).send({status : "Invalid Request"})
//         } else {
//           //console.log(data)
//            const refreshToken = data.refresh_token;
//            if (refreshToken !== null) {
//             return data;
//           } else {
//             //access token이 있다면
//             //액세스 토큰 확인하여 자동로그인으로 메인페이지 연결?
//             console.log('로그인을 한 상태입니다')
//             return res.send('로그인을 한 상태입니다')
//           }
//         }
//       })
//       .catch((err) => {
//         console.log('유저를 못찾은 것 같음, 혹은 로직문제', err)
//         return res.status(500).send(err)
//       })

//     await user
//       .findOne({
//         raw: true,
//         attributes: { exclude: [ "password","createdAt","updatedAt"] },
//         where: { email : email }
//       })
//       .then((userdata) => {
//         console.log('여기도 결국',userdata)
//         generateAccess(userdata)
//       })
//       .catch(err => {
//         console.log('login 두번째 find',err)
//         return res.status(500).send(err)
//       })
//   }
// };
