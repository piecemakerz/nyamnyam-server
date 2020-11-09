const express = require('express');
const router = express.Router();

const searchController = require('../controller/search');

router.get("/production/&searchby=?", searchController.searchProduction.get);

//후순위
// router.get('/ingredient/&searchby=?', searchController.ingredient.get);
// router.get('/store/&searchby=?', searchController.store.get);

//&searchby=

module.exports = router;
