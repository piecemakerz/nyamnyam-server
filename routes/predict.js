const express = require("express");
const router = express.Router();

const predictController = require("../controller/predict");

router.get("/", predictController.predict.get);

module.exports = router;
