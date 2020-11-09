'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('store_productions', 
      [{
        storeId:1,  //1
        productionId:1,
      },{
        storeId:1,  //2 
        productionId:2,
      },{
        storeId:1,  //3
        productionId:3,
      },{
        storeId:1,  //4
        productionId:4,
      },{ /******** 한슬 1 ******/
        storeId:2, //5
        productionId:5,
      },{
        storeId:2, //6
        productionId:6,
      },{
        storeId:2,  //7
        productionId:7,
      },{
        storeId:2,  //8
        productionId:8,
      },{
        storeId:2,  //9
        productionId:9,
      },{
        storeId:2,  //10
        productionId:10,
      },{
        storeId:2, //11
        productionId:11,
      },{ /******** 수진 1 ******/
        storeId:3,  //12
        productionId:1,
      },{
        storeId:3,  //13
        productionId:2,
      },{
        storeId:3, //14
        productionId:12,
      },{
        storeId:3,  //15
        productionId:13,
      },{
        storeId:3,   //16
        productionId:14,
      },{/******** 수진 2 ******/
        storeId:4,  //17
        productionId:1,
      },{
        storeId:4, //18
        productionId:2,
      },{
        storeId:4,  //19
        productionId:3,
      },{
        storeId:4,  //20
        productionId:12,
      },{
        storeId:4,  //21
        productionId:15,
      },{ /******** 혁원 1 ******/
        storeId:5,  //22
        productionId:1,
      },{
        storeId:5,  //23
        productionId:16,
      },{
        storeId:5,  //24
        productionId:17,
      },{ /******** 혁원 2 ******/
        storeId:6,  //25
        productionId:2,
      },{
        storeId:6,  //26
        productionId:3,
      },{
        storeId:6,  //27
        productionId:16,
      },{ /******** 혁원 3 ******/
        storeId:7,  //28
        productionId:1,
      },{
        storeId:7,  //29
        productionId:2,
      },{
        storeId:7,  //30
        productionId:3,
      },{
        storeId:7,  //31
        productionId:18,
      },{
        storeId:7,  //32
        productionId:19,
      },{ /******** 원동 1 ******/
        storeId:8,  //33
        productionId:20,
      },{
        storeId:8,  //34
        productionId:21,
      },{ /******** 원동 2 ******/
        storeId:9,  //35
        productionId:22,
      },{
        storeId:9,  //36
        productionId:23,
      },{
        storeId:9, //37
        productionId:24,
      },{ /******** 원동 3 ******/
        storeId:10,  //38
        productionId:21,
      },{
        storeId:10,  //39
        productionId:25,
      },{
        storeId:10,  //40
        productionId:26,
      },{ /******** 원동 4 ******/
        storeId:11,  //41
        productionId:21,
      },{
        storeId:11,  //42
        productionId:25,
      },{
        storeId:11,  //43
        productionId:27,
      },{
        storeId:11,  //44
        productionId:28,
      },{ /******** 공통 두번째 ******/
        storeId:1,  //45
        productionId:29,
      },{
        storeId:1,  //46
        productionId:30,
      },{
        storeId:1,  //47
        productionId:31,
      },{
        storeId:1,  //48
        productionId:32,
      },{
        storeId:1,  //49
        productionId:33,
      },{
        storeId:1,  //50
        productionId:34,
      },{
        storeId:1,  //51
        productionId:35,
      },{
        storeId:1,  //52
        productionId:36,
      },{
        storeId:1,  //53
        productionId:37,
      },{
        storeId:1,  //54
        productionId:38,
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'store_productions',
      {
        storeId: {
          [Op.in]: [1,2,3,4,5,6,7,8,9,10,11],
        },
      },
      {}
    );
  }
};
