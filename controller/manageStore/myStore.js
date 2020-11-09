module.exports = {
  get: async (req, res) => {
    const { user, store } = require('../../models');
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where: { email: account },
      attributes: ['id'],
    });

    const findStore = await store.findAll({
      where: {
        userId: id.dataValues.id,
      },
    });
    console.log('스토어', findStore);
    res.status(200).send(findStore);
  },
};
