const express = require('express');
const router = express.Router();

const trendController = require('../controller/trend');

//trend
router.get('/desserttype', trendController.dessertType.get);
router.get('/desserttype/array', trendController.dessertTypeArray.get);
router.get('/ingredient', trendController.ingredient.get);
router.get('/ingredient/array', trendController.ingredientArray.get);

//signature
router.get('/signature/desserttype', trendController.signatureDessertType.get);
router.get(
  '/signature/desserttype/array',
  trendController.signatureDessertTypeArray.get
);
router.get('/signature/ingredient', trendController.signatureIngredient.get);
router.get(
  '/signature/ingredient/array',
  trendController.signatureIngredientArray.get
);
//인피니트 스크롤을 하게 되면 서버측에서는 그냥 다 보내주어도 괜찮은 것인가?

module.exports = router;
