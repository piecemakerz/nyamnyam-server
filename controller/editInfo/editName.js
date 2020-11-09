module.exports = {
  post: async (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    if (!req.body.username) {
      return res.status(400).send('Invalid Request');
    }

    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where: { email: account },
      attributes: ['id'],
    });

    const userData = user
      .findOne({ where: { id: id.dataValues.id } })
      .then((data) => {
        if (!data) {
          res.status(404).send('요청된 유저 정보가 잘못되었습니다.');
        }
      });

    const updateData = user
      .update(
        { username: req.body.username },
        { where: { id: id.dataValues.id } }
      )
      .then((data) => {
        return res.status(201).send('이름이 수정되었습니다.');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ updateData: err });
      });

    userData.then(updateData).catch((err) => res.status(500).send(err));
  },
};
