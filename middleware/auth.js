const authMiddleware = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const { user } = require('../models');
  require('dotenv').config();

  console.log('auth req.body', req.body);
  const access_token = req.headers['x-access-token'];

  // token does not exist
  if (!access_token) {
    return res
      .status(404)
      .json('잘못된 요청입니다. 토큰이 없거나 로그인 되지 않았습니다');
  }

  // 토큰 만료 확인하기
  const checkToken = () => {
    const access = jwt.verify(access_token, process.env.ACCESS_SECRET, {
      expiresIn: '100m',
      issuer: 'nyam-nyamServer',
    });

    const token = (access) => {
      console.log('access 토큰유효성 검사를 하였습니다');
      //next()
      return;
    };
    token(access);
  };

  const onError = (error) => {
    console.log('여기인건가~~~~', error.message);
    if (error.message === 'jwt expired') {
      console.log('auth error', error.message);
      return res
        .status(401)
        .json({ 'access token이 만료되었습니다': error.message });
    } else {
      return res
        .status(403)
        .json({ 'access token 유효성 에러': error.message });
    }
  };

  //process the promise
  user
    .findOne({
      where: { access_token: access_token },
    })
    .then((data) => {
      if (data) {
        console.log('auth 로컬');
        checkToken();
      } else {
        return res
          .status(404)
          .json('확인되지 않은 유저입니다. 토큰을 확인해주세요');
      }
    })
    .catch(onError)
    .then(next());
};

module.exports = authMiddleware;

// 1) 클라이언트 측에서는 액세스 토큰만 보냄
// 2) 서버측에서 액세스 토큰을 확인함
//   액세스 토큰이 만료가 되거나 => 클라이언트 측에 오류를 보내기(401)
//   유효성이 검증되지 않으면 => 클라이언트 측에 오류를 보내기(403)

// 3) 만료가 되면 클라이언트 측에서 /token 요청 (이때는 액세스와 리프레시를 모두 보냄)
// 4) 액세스, 리프레시 토큰을 유효성(서명부분)을 확인해서
//   액세스 서명이 조작되었다면 => 403 오류를 보내기
//   액세스 서명은 유효성이 확인되면, 리프레시 토큰의 만료기간 확인하기
//     리프레시 만료기간이 지났으면 => 401 에러
//     리프레시 유효기간이 있으나, 서명이 변조된 경우 => 403
//     리프레시 유효기간이 있고, 서명도 유효하다면 => 액세스 토큰을 업뎃해서 클라이언트 측에 보내기
