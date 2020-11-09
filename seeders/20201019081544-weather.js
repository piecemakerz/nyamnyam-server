'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('weather', 
      [{
        name : '번개',
        icon : 'http://openweathermap.org/img/wn/11d@2x.png',
      },
      {
        name : '소나기',
        icon : 'http://openweathermap.org/img/wn/09d@2x.png',
      },
      {
        name : '비',
        icon : 'http://openweathermap.org/img/wn/09d@2x.png',
      },
      {
        name : '눈',
        icon : 'http://openweathermap.org/img/wn/13d@2x.png',
      },
      {
        name : '황사',
        icon : 'http://openweathermap.org/img/wn/50d@2x.png',
      },
      {
        name : '안개',
        icon : 'http://openweathermap.org/img/wn/50d@2x.png',
      },
      {
        name : '태풍',
        icon : 'http://openweathermap.org/img/wn/50d@2x.png',
      },
      {
        name : '맑음',
        icon : 'http://openweathermap.org/img/wn/01d@2x.png',
      },
      {
        name : '구름',
        icon : 'http://openweathermap.org/img/wn/03d@2x.png',
      }
    ], 
      {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'weather',
      {
        name: {
          [Op.in]: ["번개", "소나기", "태풍", "비", "눈", "맑음", "구름", "안개", "황사"],
        },
      },
      {}
    );
  }
};
