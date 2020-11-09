const express = require('express');
const router = express.Router();

const socialController = require('../controller/social');

//판매내역을 가져오는 get요청은 userinfo/mymenu api를 이용한다
router.get('/kakao', socialController.kakaoSignup.get);
// router.get('/registered', socialController.registered.get);
// router.get('/existing', socialController.existing.get);
// router.get('/unlink', socialController.unLink.get);
module.exports = router;
