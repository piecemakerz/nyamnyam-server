module.exports = {
  get: async (req, res) => {
    const storeId = req.query.storeId;
    const productionId = req.query.productionId;
    const {
      user,
      store,
      production,
      production_ingredient,
      ingredient,
    } = require('../../models');
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    console.log(req.query); //storeId, productionId

    //해당 유저만 접근할 수 있도록 하기
    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where: { email: account },
      attributes: ['id'],
    });
    const checkStore = await store.findOne({
      where: { id: storeId, userId: id.dataValues.id },
    });
    if (!checkStore)
      return res.status(404).json('해당 매장은 접근 권한이 없습니다');

    //기존 기능 시작
    const storeInfo = await store.findOne({
      where: { id: storeId },
    });
    const menuInfo = await production.findOne({
      where: { id: productionId },
    });
    const findIngredient = await production_ingredient.findAll({
      where: { productionId: productionId },
    });
    const ingredientInfo = await ingredient.findOne({
      where: {
        id: findIngredient[0].dataValues.ingredientId,
      },
    });
    if (storeInfo) {
      if (menuInfo) {
        if (ingredientInfo) {
          if (findIngredient[1]) {
            const ingredientInfo2 = await ingredient.findOne({
              where: {
                id: findIngredient[1].dataValues.ingredientId,
              },
            });
            res.status(200).send({
              storeName: storeInfo.dataValues.storeName,
              productionName: menuInfo.dataValues.productionName,
              productionImg: menuInfo.dataValues.productionImg,
              price: menuInfo.dataValues.price,
              info: menuInfo.dataValues.info,
              ingredient1: ingredientInfo.dataValues.name,
              ingredient2: ingredientInfo2.dataValues.name,
              dessertType: menuInfo.dataValues.dessertType,
              type: menuInfo.dataValues.type,
            });
          } else {
            res.status(200).send({
              storeName: storeInfo.dataValues.storeName,
              productionName: menuInfo.dataValues.productionName,
              productionImg: menuInfo.dataValues.productionImg,
              price: menuInfo.dataValues.price,
              info: menuInfo.dataValues.info,
              ingredient1: ingredientInfo.dataValues.name,
              ingredient2: null,
              dessertType: menuInfo.dataValues.dessertType,
              type: menuInfo.dataValues.type,
            });
          }
        }
      }
    } else {
      res.status(400).send('Bad Request');
    }
  },

  post: async (req, res) => {
    console.log('edit', req.body, req.file);
    const {
      production,
      production_ingredient,
      ingredient,
    } = require('../../models');
    const {
      productionId,
      productionName,
      price,
      ingredient1,
      ingredient2,
      info,
      dessertType,
      //type,
    } = req.body;

    const check = new Promise((resolve, reject) => {
      if (req.file === undefined) {
        //이미지 파일이 없는 경우
        resolve();
      } else {
        reject();
      }
    });

    check
      .then(async () => {
        await production
          .update(
            {
              productionName: productionName,
              price: price,
              info: info,
              dessertType: dessertType,
              //type: type,
            },
            { where: { id: productionId } }
          )
          .catch((err) => console.log(err));

        await production_ingredient
          .destroy({
            where: { productionId: productionId },
          })
          .catch((err) => res.json({ destroy: err }));
        await production_ingredient
          .create({
            productionId: productionId,
            ingredientId: ingredient1,
          })
          .catch((err) => res.json({ ingre1: err }));
        if (ingredient2) {
          await production_ingredient
            .create({
              productionId: productionId,
              ingredientId: ingredient2,
            })
            .catch((err) => res.json({ ingre2: err }));
        }

        return res.status(201).send('수정되었습니다');
      })
      .catch(async () => {
        await production
          .update(
            {
              productionName: productionName,
              productionImg: req.file.location,
              price: price,
              info: info,
              dessertType: dessertType,
              //type: type,
            },
            { where: { id: productionId } }
          )
          .catch((err) => console.log(err));

        await production_ingredient
          .destroy({
            where: { productionId: productionId },
          })
          .catch((err) => res.json({ destroy: err }));
        await production_ingredient
          .create({
            productionId: productionId,
            ingredientId: ingredient1,
          })
          .catch((err) => res.json({ ingre1: err }));
        if (ingredient2) {
          await production_ingredient
            .create({
              productionId: productionId,
              ingredientId: ingredient2,
            })
            .catch((err) => res.json({ ingre2: err }));
        }

        return res.status(201).send('수정되었습니다');
      });
  },
};
