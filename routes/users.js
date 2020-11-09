const express = require('express');
const router = express.Router();

const userController = require('../controller/users');
const authMiddleware = require('../middleware/auth');

router.post('/login', userController.login.post);
router.post('/logout', authMiddleware, userController.logout.post);
router.post('/signup', userController.signup.post);
router.post('/emailconfirm', userController.emailConfirm.post);
//액세스 토큰이나 리프레시 토큰이 만료되었을 때 갱신하는 라우터 필요??

module.exports = router;
