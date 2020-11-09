module.exports = {
	get: async (req, res) => {
		const { store, production, store_production, production_ingredient, production_quantity } = 
			require('../../models');

		// 디저트 종류별 디저트 양
		//일단 기간 상관없이 누적판매량만
		let quantity0 = await production_quantity.findAll({
			attributes : ['quantity', 'storeId','productionId'],
			order: [['quantity', 'DESC']],
			include : {
				model : production,
				where : { type : 1}, //dessertType: 0, 
				required: true,
			},
		})


		return res.status(200).json(quantity0)
	}
};
  