module.exports = {
  get: async (req, res) => {
    const {
      user,
      store,
      production,
      production_quantity,
      //store_production,
    } = require('../../models');

    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];
    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;

    //user 정보
    const findUser = await user.findOne({
      attributes: ['id','username', 'userImg'],
      where: { email : account },
    }); 
    //console.log('유저', findUser);

    //가게 정보
    const findStore = await store.findAndCountAll({
      attributes: ['id'],
      where: {
        userId: findUser.dataValues.id,
      },
    });

    //production 수
    const findProduction = await production.findAndCountAll({
      include : {
        model : store,
        where : { userId : findUser.dataValues.id }
      }
    })

    //production_quantity(업로드) 개수 찾기
    const findStoreId = await store.findAll({
      attributes: ['id'],
      where: {
        userId: findUser.dataValues.id,
      },
    })
    let findStoreIdArr =[]
    findStoreId.map(el =>{
      findStoreIdArr.push(el.id)
      return findStoreIdArr
    })
    const upload = await production_quantity.findAndCountAll({
      where : { storeId : findStoreIdArr }
    })

    res.status(200).send({
        username: findUser.dataValues.username,
        userImg: findUser.dataValues.userImg,
        store: findStore.count,
        production: findProduction.count,
        upload: upload.count,
      });


    // const productions = [];
    // for (let i = 0; i < findStore.count; i++) {
    //   const findProduction = await store_production.findAndCountAll({
    //     attributes: ['storeId', 'productionId'],
    //     where: {
    //       storeId: findStore.rows[i].dataValues.id,
    //     },
    //   });
    //   productions.push(findProduction); //내 매장에 있는 제품들
    // }
    // const sumProductions = (productions) => {
    //   let count = 0;
    //   for (let i = 0; i < productions.length; i++) {
    //     count = count + productions[i].count;
    //   }
    //   return count;
    // };
    // const quantities = [];
    // for (let i = 0; i < productions.length; i++) {
    //   for (let j = 0; j < productions[i].count; j++) {
    //     const quantity = await production_quantity.findAll({
    //       attributes: ['storeId', 'productionId', 'quantity'],
    //       where: {
    //         storeId: findStore.rows[i].dataValues.id,
    //         productionId: productions[i].rows[j].dataValues.productionId,
    //       },
    //     });
    //     quantities.push(quantity);
    //   }
    // }
    // res.status(200).send({
    //   username: findUser.dataValues.username,
    //   userImg: findUser.dataValues.userImg,
    //   store: findStore.count,
    //   production: sumProductions(productions),
    //   upload: quantities.length,
    // });
    // console.log('콘솔', quantities);
  },
};
