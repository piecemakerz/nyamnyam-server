'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'productions',
      [
        {
          /*********4개************/
          productionName: '티라미수', //1
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604123842971.jpg',
          price: 6800,
          info: '티라미수 케이크입니다.',
          dessertType: 0,
          type: null,
        },
        {
          productionName: '치즈케이크', //2
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604123890113.jpg',
          price: 6500,
          info: '치즈 케이크입니다.',
          dessertType: 0,
          type: null,
        },
        {
          productionName: '치즈 타르트', //3
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604123922906.jpg',
          price: 6500,
          info: '치즈 타르트입니다.',
          dessertType: 0,
          type: null,
        },
        {
          productionName: '허니브레드', //4
          productionImg: '',
          price: 6500,
          info: '네모난 빵에 시럽과 크림을 올려 구운 것입니다.',
          dessertType: 4,
          type: null,
        },
        {
          /*********  7개  ****** 시그니처로 7개  ****/
          productionName: '후르츠케이크', //5
          productionImg: '',
          price: 7500,
          info: '다양한 과일로 만든 신선한 생크림케이크입니다.',
          dessertType: 0,
          type: 1,
        },
        {
          productionName: '마롱케이크', //6
          productionImg: '',
          price: 6500,
          info: '밤과 팥을 넣어 만든 부드러운 케이크입니다.',
          dessertType: 0,
          type: 1,
        },
        {
          productionName: '몽블랑', //7
          productionImg: '',
          price: 6500,
          info: '부드러운 크림 사이에 밤을 넣은 타르트입니다.',
          dessertType: 3,
          type: 1,
        },
        {
          productionName: '갸또 쇼콜라', //8
          productionImg: '',
          price: 6300,
          info:
            '다크 초콜릿 가나슈와 럼에 절인 건포도가 살짝 들어간 진한 초콜릿 케이크',
          dessertType: 0,
          type: 1,
        },
        {
          productionName: '얼그레이 케이크', //9
          productionImg: '',
          price: 6000,
          info:
            '얼그레이 향이 풍부한 생크림에 바삭바삭한 식감의 초콜릿 웨하스로 엑센트를 준 케이크',
          dessertType: 0,
          type: 1,
        },
        {
          productionName: '바나나 타르트', //10
          productionImg: '',
          price: 5500,
          info:
            '아몬드 크림과 함게 구운 바나나와 바닐라 생크림이 맛과 향이 조화로운 타르트',
          dessertType: 3,
          type: 1,
        },
        {
          productionName: '폼므 타르트', //11
          productionImg: '',
          price: 5000,
          info:
            '레드와인과 화이트 와인에 조린 사과를 아몬드 크림과 함께 구운 풍미가 좋은 타르트',
          dessertType: 3,
          type: 1,
        },
        {
          /********* 수진1호점 5개  ***** 공통 2개 시그니처 3개 ***/
          productionName: '솜솜 빵', //12
          productionImg: '',
          price: 2000,
          info: '강아지 솜이를 닮은 크림빵 입니다.',
          dessertType: 4,
          type: 1,
        },
        {
          productionName: '슈스 마카롱', //13
          productionImg: '',
          price: 3000,
          info: '슈스 베이커리',
          dessertType: 3,
          type: 1,
        },
        {
          productionName: '민트초코 쿠키', //14
          productionImg: '',
          price: 1000,
          info: '민트초코로 만든 상큼한 쿠키',
          dessertType: 2,
          type: 1,
        },
        {
          /********* 수진2호점 5개  ***** 공통 3개 시그니처 2(솜솜빵 포함)개 ***/
          productionName: '슈스 케이크', //15
          productionImg: '',
          price: 5000,
          info: '슈스 베이커리만의 케이크',
          dessertType: 0,
          type: 1,
        },
        {
          /********* 혁원1호점 3개  ***** 공통 1개 시그니처 2개 ***/
          /********* 혁원2호점 3개  ***** 공통 2개 시그니처 1개(단팥빵) ***/
          productionName: 'H 단팥빵', //16
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604123962200.jpg',
          price: 1300,
          info: '파리바게뜨의 단팥빵',
          dessertType: 4,
          type: 1,
        },
        {
          productionName: 'H 소보루', //17
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604124002689.png',
          price: 1300,
          info: '파리바게뜨의 소보루',
          dessertType: 4,
          type: 1,
        },
        {
          /********* 혁원3호점 5개  ***** 공통 3개 시그니처 2개(마카롱, 쿠키) ***/
          productionName: 'H 마카롱', //18
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604124032680.jpeg',
          price: 1500,
          info: '파리바게뜨의 마카롱',
          dessertType: 1,
          type: 1,
        },
        {
          productionName: 'H 쿠키', //19
          productionImg:
            'https://nyam-nyam.s3.ap-northeast-2.amazonaws.com/1604124065453.jpg',
          price: 1500,
          info: '파리바게뜨의 쿠키',
          dessertType: 2,
          type: 1,
        },
        {
          /********* 원동1호점 2개  *****시그니처 2개 ***/
          productionName: 'W 타르트', //20
          productionImg: '',
          price: 2000,
          info: '뚜레주르의 타르트',
          dessertType: 3,
          type: 1,
        },
        {
          productionName: 'W 초코케이크', //21
          productionImg: '',
          price: 1500,
          info: '뚜레주루의 초코케이크',
          dessertType: 0,
          type: 1,
        },
        {
          /********* 원동2호점 3개  ***** 시그니처 3개 ***/
          productionName: 'W 딸기 케이크', //22
          productionImg: '',
          price: 2300,
          info: '뚜레주르의 딸기 케이크',
          dessertType: 0,
          type: 1,
        },
        {
          productionName: 'W 소보루', //23
          productionImg: '',
          price: 1500,
          info: '뚜레주르의 소보루',
          dessertType: 4,
          type: 1,
        },
        {
          productionName: 'W 딸기 마카롱', //24
          productionImg: '',
          price: 1500,
          info: '뚜레주르의 딸기 마카롱',
          dessertType: 4,
          type: 1,
        },
        {
          /********* 원동3호점 3개  ***** 시그니처 3개(타르트는 공통) ***/
          productionName: 'W 민트초코 케이크', //25
          productionImg: '',
          price: 4000,
          info: '뚜레주르의 민트초코 케이크',
          dessertType: 0,
          type: 1,
        },
        {
          productionName: 'W 라즈베리 마카롱', //26
          productionImg: '',
          price: 1500,
          info: '뚜레주르의 라즈베리 마카롱',
          dessertType: 4,
          type: 1,
        },
        {
          /********* 원동3호점 4개  ***** 시그니처 4개(타르트, 민트초코 케이크는 공통) ***/
          productionName: 'W 민트초코 쿠키', //27
          productionImg: '',
          price: 1000,
          info: '뚜레주르의 민트초코 쿠키',
          dessertType: 2,
          type: 1,
        },
        {
          productionName: 'W 단팥빵', //28
          productionImg: '',
          price: 1500,
          info: '뚜레주르의 단팥빵',
          dessertType: 4,
          type: 1,
        },
        {
          /********* 공통 추가  ***** ***/
          productionName: '단팥빵', //29
          productionImg: '',
          price: 1300,
          info: '일반적인 단팥빵입니다',
          dessertType: 4,
          type: null,
        },
        {
          productionName: '피자빵', //30
          productionImg: '',
          price: 1500,
          info: '피자 치즈와 소세지가 들어있는 빵입니다.',
          dessertType: 4,
          type: null,
        },
        {
          productionName: '소보루빵', //31
          productionImg: '',
          price: 1300,
          info: '일반적인 소보루 빵',
          dessertType: 4,
          type: null,
        },
        {
          productionName: '샌드위치', //32
          productionImg: '',
          price: 5000,
          info: '일반적인 샌드위치',
          dessertType: 4,
          type: null,
        },
        {
          productionName: '소보루 단팥빵', //33
          productionImg: '',
          price: 1800,
          info: '단팥빵에 소보루가 얹어진 빵',
          dessertType: 4,
          type: null,
        },
        {
          productionName: '딸기잼빵', //34
          productionImg: '',
          price: 1000,
          info: '딸기쨈이 들어간 부드러운 빵',
          dessertType: 4,
          type: null,
        },
        {
          productionName: '초코칩 쿠키', //35
          productionImg: '',
          price: 1000,
          info: '일반적인 초코쿠키',
          dessertType: 2,
          type: null,
        },
        {
          productionName: '에그타르트', //36
          productionImg: '',
          price: 1300,
          info: '일반적인 에그타르트',
          dessertType: 3,
          type: null,
        },
        {
          productionName: '사과 마카롱', //37
          productionImg: '',
          price: 1500,
          info: '사과가 들어간 마카롱',
          dessertType: 1,
          type: null,
        },
        {
          productionName: '땅콩 마카롱', //38
          productionImg: '',
          price: 1500,
          info: '땅콩 버터가 들어간 마카롱',
          dessertType: 1,
          type: null,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'productions',
      {
        storeId: {
          [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        },
      },
      {}
    );
  },
};

//디저트 타입 : 케이크(0), 마카롱(1), 쿠키(2), 타르트(3), 기타 빵(4), 기타(5)
//타입 : 1 이면 시그니처
