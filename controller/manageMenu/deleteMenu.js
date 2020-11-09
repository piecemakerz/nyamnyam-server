module.exports = {
  post: async (req, res) => {
    const { user, store, store_production, production, production_ingredient} = require('../../models');
    const jwt = require('jsonwebtoken');
    const { storeId, productionId } = req.body;
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

    //기존 기능 시작
    const deleteProduction = await production.destroy({
      where: {
        id: productionId,
      },
    });
    const deleteP_I_Join = await production_ingredient.destroy({
      where: {
        productionId: productionId,
      },
    });
    const deleteS_P_Join = await store_production
      .destroy({
        where: { storeId: storeId, productionId: productionId },
      })
      .then(() => {
        // if (deleteProduction || deleteP_I_Join || deleteS_P_Join) {
        res.status(201).send('삭제되었습니다');
      })
      .catch((err) => {
        res.status(404).send('Bad Request');
      });
  },
};
