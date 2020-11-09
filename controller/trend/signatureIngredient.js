module.exports = {
	get: async(req, res) => {
		console.log('test')
		const { user, store, ingredient, production, production_quantity } = 
			require('../../models');

		//주재료별로 필터링해서
		//판매량 많은순으로
		let obj = {}
		for(let i = 1; i <27; i++){
			let quantity = await production_quantity.findAll({
				attributes: ['quantity'],
				order: [['quantity', 'DESC']],
				include : {
					model : production,
					required : true,
					where : { type : 1 },
					include : {
						model : ingredient,
						where : { id : i },
						required : true,
					}
				}
			})
			obj[i] = quantity
		}
		return res.json(obj)
	}
};
  