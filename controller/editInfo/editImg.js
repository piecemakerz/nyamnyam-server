module.exports = {
	post: async (req, res) => {
		const jwt = require('jsonwebtoken');
		const access_token = req.headers['x-access-token'];
		const { user } = require('../../models')

		try {
			console.log("req.file: ", req.file.location); 
			const decoded = jwt.decode(access_token, { complete: true });
			const account = decoded.payload.account;
			await user.update({ userImg: req.file.location }, {where : { email : account }})
				.catch(err => console.log(err))
			
			res.status(200).json({ userImg: req.file.location });
		} catch (err) {
			console.log(err);
			res.status(500).send("서버 에러")
		}
	}
};
  