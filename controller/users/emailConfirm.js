module.exports = {
  post: async (req, res) => {
    const { user } = require('../../models');
    const { email } = req.body;

    let findUser = await user.findOne({
      where: { email: email },
    });
    if (findUser) {
      res.status(409).send('Existing local user');
    } else {
      res.status(200).send('사용가능한 이메일입니다.');
    }
  },
};
