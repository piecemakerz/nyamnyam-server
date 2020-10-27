module.exports = {
  post: async (req, res) => {
    const { user, production, store_production, production_ingredient, ingredient } 
      = require('../../models');
      const jwt = require('jsonwebtoken');
    const { storeId, productionName, productionImg, ingredient1, ingredient2, price, info, dessertType,} 
      = req.body;
    const access_token = req.headers['x-access-token']
  
    //해당 유저만 접근할 수 있도록 하기
    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where : { email : account},
      attributes: ['id']
    })
    const checkStore = await store.findOne({where : { id : storeId, userId : id.dataValues.id}})
    console.log(id.dataValues.id, checkStore)
    if(!checkStore) return res.status(404).json('해당 매장은 접근 권한이 없습니다')

    //본래 기능 시작
    const addPro = await production.create({
      productionName: productionName,
      productionImg: productionImg,
      price: price,
      info: info,
      dessertType: dessertType,
      type: 1,
    }); //메뉴를 추가하고
    const joinS_P = await store_production.create({
      storeId: storeId,
      productionId: addPro.dataValues.id,
    }); //메뉴와 스토어를 연결.

    //재료이름을 기준으로 id 찾기
    const ingre1 = await ingredient.findOne({where : { name : ingredient1}})
    const ingre2 = await ingredient.findOne({where : { name : ingredient2}})

    const joinP_I = await production_ingredient.create({
      productionId: addPro.dataValues.id,
      ingredientId: ingre1.dataValues.id,
    }); //메뉴와 주재료 연결

    if (ingredient2) {
      await production_ingredient.create({
        productionId: addPro.dataValues.id,
        ingredientId: ingre2.dataValues.id,
      });
    }
    console.log('productionId', addPro.dataValues.id);

    if (addPro || joinS_P || joinP_I) {
      res.status(201).send('추가되었습니다');
    } else {
      res.status(404).send('BadRequest');
    }
  },
};
