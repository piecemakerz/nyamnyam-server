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

		await user.findOne({ where : { id : id.dataValues.id }})
			.catch(err => res.send(err))
		await user.destroy({ where : { id : id.dataValues.id}})
			.then(() => res.status(201).send('회원탈퇴 되었습니다'))
	}
};
