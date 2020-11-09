const express = require('express');
const router = express.Router();

const userInfoController = require('../controller/info');

router.get('/info', userInfoController.info.get);

module.exports = router;
