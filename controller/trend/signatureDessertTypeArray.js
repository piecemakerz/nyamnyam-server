module.exports = {
	get: async (req, res) => {
		console.log('test')
		const { store, production, store_production, production_ingredient, production_quantity } = 
			require('../../models');

		let result = [];
		//디저트 종류별 디저트 양
		//일단 기간 상관없이 누적판매량만
		let quantity0 = await production_quantity.findAll({
			attributes : ['quantity', 'storeId','productionId'],
			order: [['quantity', 'DESC']],
			include : {
				model : production,
				where : { dessertType: 0, type : 1}, 
				required: true,
			},
		})
		let quantity1 = await production_quantity.findAll({
			attributes : ['quantity','storeId','productionId'],
			order: [['quantity', 'DESC']],
			include : {
				model : production,
				where : { dessertType: 1, type : 1}, 
				required: true,
			},
		})
		let quantity2 = await production_quantity.findAll({
			attributes : ['quantity', 'storeId','productionId'],
			order: [['quantity', 'DESC']],
			include : {
				model : production,
				where : { dessertType: 2, type : 1}, 
				required: true,
			},
		})
		let quantity3 = await production_quantity.findAll({
			attributes : ['quantity', 'storeId','productionId'],
			order: [['quantity', 'DESC']],
			include : {
				model : production,
				where : { dessertType: 3, type : 1}, 
				required: true,
			},
		})
		let quantity4 = await production_quantity.findAll({
			attributes : ['quantity','storeId','productionId'],
			order: [['quantity', 'DESC']],
			include : {
				model : production,
				where : { dessertType: 4, type : 1}, 
				required: true,
			},
		})
		result.push(quantity0,quantity1,quantity2,quantity3, quantity4)

		return res.json(result)
	}
};
  