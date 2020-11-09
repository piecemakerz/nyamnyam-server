'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ingredients', 
      [{
        name: "초콜릿"
      },{
        name: "녹차"
      },{
        name: "생크림"
      },{
        name: "딸기"
      },{
        name: "민트초코"
      },{
        name: "요거트"
      },{
        name: "블루베리"
      },{
        name: "콩가루"
      },{
        name: "땅콩"
      },{
        name: "라즈베리"
      },{
        name: "치즈"
      },{
        name: "커피"
      },{
        name: "밤"
      },{
        name: "무화과"
      },{
        name: "키위"
      },{
        name: "복숭아"
      },{
        name: "망고"
      },{
        name: "당근"
      },{
        name: "시나몬"
      },{
        name: "꿀"
      },{
        name: "크림"
      },{
        name: "사과"
      },{
        name: "바나나"
      },{
        name: "건포도"
      },{
        name: "팥"
      },{
        name: "소보루"
      },], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'ingredients',
      {
        name: {
          [Op.in]: ["초콜릿","녹차","생크림","딸기","민트초코",
          "요거트","블루베리","콩가루","땅콩","라즈베리","치즈",
          "커피","밤","무화과","키위","복숭아","망고","당근",
          "시나몬","꿀","크림","사과","바나나","건포도", "팥", "소보루"],
        },
      },
      {}
    );
  }
};
