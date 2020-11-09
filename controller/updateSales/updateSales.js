const { production, store_production } = require('../../models');
module.exports = {
  get: async (req, res) => {
    const { storeId } = req.params;
    const findProduction = await store_production.findAll({
      include: {
        model: production,
        attributes: ['productionName', 'productionImg'],
      },
      where: { storeId: storeId },
    });
    if (findProduction) {
      res.status(200).send(findProduction);
    } else {
      res.status(400).send('Bad Request');
    }
  },
  post: async (req, res) => {
    const { storeId } = req.body;
    const { production_quantity } = require('../../models');

    const findFunc = req.body.data.map(async (el) => {
      const { date, weatherId, production } = el;

      console.log('findWeather', el.weatherId);
      let quantity;
      for (let i = 0; i < production.length; i++) {
        quantity = await production_quantity
          .create({
            productionId: production[i][0],
            storeId: storeId,
            date: date,
            quantity: production[i][1],
            weatherId: weatherId, //실제로는 ID가 들어갈것
          })
          .catch((err) => console.log('err', err));
      }
      if (quantity) {
        return true;
      } else {
        return false;
      }
    });

    if (findFunc) {
      return res.status(201).send('내역이 반영되었습니다');
    } else {
      return res.status(404).send('Bad Request');
    }
  },
};
