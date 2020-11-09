module.exports = {
  get: async (req, res) => {
    const {
      user,
      store,
      store_production,
      production,
    } = require('../../models');
    const storeId = req.params.storeId;
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    // if (req.body === undefined || req.body.userId === undefined||req.body.storeId===undefined||req.body.storeName===undefined) {
    // res.status(404).send('Bad Request');

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

    //기능 시작
    const menuList = await store_production.findAll({
      include: {
        model: production,
      },
      where: {
        storeId: storeId,
      },
    });
    if (menuList) {
      res.status(200).send(menuList);
    } else {
      res.status(400).send('Bad Request');
    }
  },
};
