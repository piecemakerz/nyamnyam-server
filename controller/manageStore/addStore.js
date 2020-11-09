const { user, store } = require('../../models');
module.exports = {
  post: async (req, res) => {
    const { storeName, storeAddress, latitude, longitude } = req.body;
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where: { email: account },
      attributes: ['id'],
    });

    const createStore = await store
      .create({
        userId: id.dataValues.id,
        storeName: storeName,
        storeAddress: storeAddress,
        latitude: latitude,
        longitude: longitude,
      })
      .then((result) => {
        if (result) {
          res.status(200).send('가게가 추가되었습니다. 축하합니다.');
        } else {
          res.status(400).send('Bad Request');
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};
