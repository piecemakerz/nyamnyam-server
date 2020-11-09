'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', 
      [{
        email: '1111@test.com',
        password : process.env.PASSWORD,
        userName: "공용",
        userImg : "https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1603903108554.png",
        social : null
      },
      {
        email: 'souvenir@test.com',
        password : process.env.PASSWORD,
        userName: "한슬",
        userImg : "https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1603903176152.jpg",
        social : null
      },
      {
        email: 'sjkwan0922@test.com',
        password : process.env.PASSWORD,
        userName: "수진",
        userImg : "https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1603903212671.jpeg",
        social : null
      },
      {
        email: 'piecemakerz@test.com',
        password : process.env.PASSWORD,
        userName: "혁원",
        userImg : "https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1603903247963.png",
        social : null
      },
      {
        email: 'lwd3737@test.com',
        password : process.env.PASSWORD,
        userName: "원동",
        userImg : "https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1603903287932.png",
        social : null
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'users',
      {
        userName: {
          [Op.in]: ["공용","한슬","수진","혁원","원동"],
        },
      },
      {}
    );
  }
};
