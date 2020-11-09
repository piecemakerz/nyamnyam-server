module.exports = {
  post: async (req, res) => {
    const { user } = require('../../models');
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where : { email : account},
      attributes: ['id']
    })

    const findUser = await user
      .findOne({
        where: {
          id: id.dataValues.id,
        },
      })
      .then((findUser) => {
        if (findUser) {
          user.update(
            {
              access_token: null,
              refresh_token: null,
            },
            { where: { id: findUser.dataValues.id } }
          );
          res.status(200).send('로그아웃 되었습니다');
        } else {
          return res.status(400).json({
            status: 'Invalid request',
          });
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },
};
