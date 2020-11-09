'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('production_ingredients', 
      [{
        productionId:1, //티라미수
        ingredientId:11, //11 12
      },{
        productionId:1, //티라미수
        ingredientId:12, //11 12
      },{
        productionId:2, //치즈케이크
        ingredientId:11, 
      },{
        productionId:3, //치즈타르트
        ingredientId:11,
      },{
        productionId:4, //허니브레드
        ingredientId:20,
      },{
        productionId:4, //허니브레드
        ingredientId:21,
      },{ /************** 한슬 1  *************/
        productionId:5, //후르츠케이크
        ingredientId:3,
      },{
        productionId:5, //후르츠케이크
        ingredientId:4,
      },{
        productionId:6, //마롱케이크
        ingredientId:13,
      },{
        productionId:7, //몽블랑
        ingredientId:13,
      },{
        productionId:8, //갸또쇼콜라
        ingredientId:1, 
      },{
        productionId:9, //얼그레이
        ingredientId:12, 
      },{
        productionId:10, //바나나 타르트
        ingredientId:23, 
      },{
        productionId:11, //폼므 타르트
        ingredientId:22,
      },{ /************** 수진 1  *************/
        productionId:12, //솜솜빵
        ingredientId:21,
      },{
        productionId:13, //슈스마카롱
        ingredientId:7,
      },{
        productionId:14, //민트초코쿠키
        ingredientId:5,
      },{ /************** 수진 2  *************/
        productionId:15, //슈스케이크
        ingredientId:14,
      },{ /************** 혁원 1  *************/
        productionId:16, //H 단팥빵
        ingredientId:25,
      },{
        productionId:17, //H 소보루
        ingredientId:26,
      },{ /************** 혁원 2  *************/
        productionId:18, //H 마카롱
        ingredientId:9, 
      },{
        productionId:19, //H 쿠키
        ingredientId:1, 
      },{ /************** 원동 1  *************/
        productionId:20, //W 타르트
        ingredientId:16, 
      },{
        productionId:21, //W 초코케이크
        ingredientId:1,
      },{ /************** 원동 2  *************/
        productionId:22, //W 딸기 케이크
        ingredientId:4,
      },{
        productionId:23, //W 소보루
        ingredientId:26,
      },{
        productionId:24, //W 딸기 마카롱
        ingredientId:4,
      },{ /************** 원동 3  *************/
        productionId:25, //W 민트 초코케이크
        ingredientId:5,
      },{ 
        productionId:26, //W 라즈베리 마카롱
        ingredientId:10,
      },{ /************** 원동 4  *************/
        productionId:27, //W 민트초코 쿠키
        ingredientId:5,
      },{
        productionId:28, //W 단팥빵
        ingredientId:25, //11 12
      },{ /************** 공통 두번째 *************/
        productionId:29, //단팥빵
        ingredientId:25,
      },{
        productionId:30, //피자빵
        ingredientId:11, //11 12
      },{ 
        productionId:31, //소보루빵
        ingredientId:26,
      },{
        productionId:32, //샌드위치
        ingredientId:18, //11 12
      },{ 
        productionId:33, //소보루 단팥빵
        ingredientId:26,
      },{ 
        productionId:33, //소보루 단팥빵
        ingredientId:25,
      },{
        productionId:34, //딸기잼빵
        ingredientId:4, //11 12
      },{ 
        productionId:35, //초코칩 쿠키
        ingredientId:1,
      },{
        productionId:36, //에그타르트
        ingredientId:21, //11 12
      },{ 
        productionId:37, //사과마카롱
        ingredientId:22,
      },{
        productionId:38, //땅콩 마카롱
        ingredientId:9, //11 12
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'production_ingredients',
      {
        ingredientId: {
          [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        },
      },
      {}
    );
  }
};
