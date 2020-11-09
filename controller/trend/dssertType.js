const {
  user,
  store,
  production,
  production_quantity,
  store_production,
} = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const test = await user.findAll({
        include: [
          {
            model: store,
            include: {
              model: store_production,
            },
          },
        ],
      });
      res.status(200).send(test);
    } catch (E) {
      res.status(500).send(E);
    }
  },
};
