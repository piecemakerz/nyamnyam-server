module.exports = {
  post: async (req, res) => {
    const { user, store } = require('../../models');
    if (
      req.body === undefined ||
      req.body.username === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.stores === undefined
    ) {
      return res.status(400).send({ status: 'Invalid request' });
    }
    const { username, email, password, stores, userImg } = req.body;
    console.log('유저', req.body);

    try {
      const findUser = await user.findOne({
        where: { email: email },
      });

      if (findUser) {
        res.status(409).send('Existing local user');
      }

      const createUser = await user.create({
        email: email,
        password: password,
        username: username,
        userImg: userImg,
      });
      const findUserId = await user.findOne({
        where: {
          email: email,
        },
      });

      const createStore = await stores.map((el) => {
        store.create({
          userId: findUserId.dataValues.id,
          storeName: el.place_name,
          storeAddress: el.address_name,
          latitude: el.coord.y,
          longitude: el.coord.x,
        });
      });

      console.log('유저부분', createUser);
      console.log('유저아이디찾자', findUserId.dataValues.id);
      console.log('가게부분', createStore);
      res.status(200).send('회원가입이 완료되었습니다.');
    } catch (err) {
      res.status(500).send('Bad Request');
    }
  },
};
