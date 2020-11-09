module.exports = {
	get: async (req, res) => {
		const { production, store_production, production_quantity } = require('../../models');
		const dotenv = require('dotenv');
		dotenv.config({ path: './.env' });

		console.log(req.query)
		if(req.query.storeId === undefined) return res.status(400).send('잘못된 요청입니다')
		
		//한글을 인코딩 해주기
		const weatherName = decodeURIComponent(req.query.weather)
		console.log(weatherName)

		//store 2에서 파는 물품들
		const salesProduction = 
			await store_production.findAll({ 
				where: { storeId : req.query.storeId},
				include : [production],
				attributes : ['id'],
			});
		// console.log(salesProduction.map(e => {
		// 	return e.dataValues.production.dataValues
		// }))

		//물품들 아이디
		const salesId	= 
			salesProduction.map(e => {
				let arr = []
				arr.push(e.id)
				return arr;
			})
			//console.log(salesId)

		//각각의 양
		const salesProductionQuantity = 
			await production_quantity.findAll({
				where : { id : salesId },
				attributes : { exclude : ["weatherId","createdAt","updatedAt"]},
				order: [['quantity', 'DESC']]
			})
			.then(data =>  {
				//상품 정보
				const productionData = 
					salesProduction.map((e) => {
						let obj = {}
						obj['id'] = e.dataValues.id
						obj['production'] = e.dataValues.production.dataValues
						return obj
					})	

				//상품 id
				const productionId = 	
					salesProduction.map(e => {
						return e.dataValues.id
					})

				const quantityData = 
					data.map(e => {
						let result = []
						let resultQuantity;
						for(let i = 0; i < productionId.length ; i++){
							if(productionId[i] === e.dataValues.id){
								if(weatherName === '맑음'){
									resultQuantity = Math.round(e.dataValues.quantity * 1.8)
								} else if((weatherName === '눈' || weatherName === '비') || weatherName === '소나기'){
									resultQuantity =  Math.round(e.dataValues.quantity * 0.7)
								} else {
									resultQuantity =  e.dataValues.quantity
								}
								productionData[i]['production']['quantity'] = resultQuantity
								result = productionData[i]
							}
						}
						return result
					})								
				return res.json({
					"storeId" : req.query.storeId,
					quantityData
				})
			})
			.catch(err => {
				console.log(err)
				res.status(500).send(err)
		})

	}
};
