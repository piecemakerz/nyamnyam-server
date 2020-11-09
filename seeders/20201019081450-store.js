'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', 
      [{
        userId : 1, //1개
        storeName : '공통',
        storeAddress : '전국(서울)',
        latitude : '37.564214',
        longitude : '127.001699',
      },{
        userId : 2, //1개
        storeName : 'sonb',
        storeAddress : '서울시 종로구 자하문로9길 14',
        latitude : '37.579592',
        longitude : '126.970461',
      },{
        userId : 3, //2개
        storeName : '슈스 베이커리 1호점',
        storeAddress : '강남',
        latitude : '37.579592',
        longitude : '126.970461',
      },{
        userId : 3, 
        storeName : '슈스 베이커리 2호점',
        storeAddress : '광명사거리',
        latitude : '37.579592',
        longitude : '126.970461',
      },{
        userId : 4, //3개
        storeName : '파리바게트 신촌점',
        storeAddress : '신촌',
        latitude : '37.556094',
        longitude : '126.938978',
      },{
        userId : 4,
        storeName : '파리바게트 이대점',
        storeAddress : '이대',
        latitude : '37.557701',
        longitude : '126.945973',
      },{
        userId : 4,
        storeName : '파리바게트 디엠씨',
        storeAddress : '디엠씨',
        latitude : '37.579446',
        longitude : '126.890339',
      },{
        userId : 5, //4개
        storeName : '뚜레주르 선유도점',
        storeAddress : '선유도',
        latitude : '37.579592',
        longitude : '126.970461',
      },{
        userId : 5, 
        storeName : '뚜레주르 ECC점',
        storeAddress : '이대 ECC',
        latitude : '37.561895',
        longitude : '126.946973',
      },{
        userId : 5, 
        storeName : '뚜레주르 신촌점',
        storeAddress : '신촌',
        latitude : '37.538249',
        longitude : '126.894357',
      },{
        userId : 5, 
        storeName : '뚜레주르 행신서정마을점',
        storeAddress : '행신',
        latitude : '37.618199',
        longitude : '126.846696',
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'stores',
      {
        userId: {
          [Op.in]: [1,2,3,4,5],
        },
      },
      {}
    );
  }
};
