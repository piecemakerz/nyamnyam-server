module.exports = {
  post: async (req, res) => {
    const { user, store } = require('../../models');
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    if (req.body === undefined || req.body.storeId === undefined) {
      res.status(404).send('Bad Request');
    }
    const { storeId } = req.body;
    console.log('바디바디', req.body);

    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where: { email: account },
      attributes: ['id'],
    });
    const checkStore = await store.findOne({
      where: { id: storeId, userId: id.dataValues.id },
    });
    console.log(id.dataValues.id, checkStore);
    if (!checkStore)
      return res.status(404).json('해당 매장은 접근 권한이 없습니다');

    await store
      .destroy({
        where: {
          id: storeId,
          userId: id.dataValues.id,
        },
      })
      .then((result) => {
        if (result) {
          return res.send(200).send('삭제되었습니다.');
        } else {
          return res.status(400).send('Bad Request');
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};
