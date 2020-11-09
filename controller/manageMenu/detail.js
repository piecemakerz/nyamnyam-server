module.exports = {
  get: async(req, res) => {
    const { ingredient, production, store_production, store } = require('../../models')
    if(!req.params.id) return res.status(400).send('Bad Request')
    console.log(req.params)

    const storeId = 
      await store_production.findOne({
        attributes : ['storeId'],
        where : { productionId : req.params.id }
      })
    const storeData = await 
      store.findOne({
        attributes : ['id', 'userId', 'storeName'],
        where : { id : storeId.dataValues.storeId }
      })
    const productionData = 
      await production.findOne({
        where : { id : req.params.id },
        include : [ingredient]
      })
      .catch(err => res.status(500).send(err))

    const { id, userId, storeName } =storeData
    return res.status(200).json({
      userId, 
      storeId : id,
      storeName : storeName,
      'productionData' : productionData.dataValues
    })
  },
};
