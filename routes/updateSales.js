const express = require('express');
const router = express.Router();

const updateSalesController = require('../controller/updateSales');

router.post('/sales', updateSalesController.updateSales.post);
router.get('/sales/:storeId', updateSalesController.updateSales.get);

module.exports = router;
