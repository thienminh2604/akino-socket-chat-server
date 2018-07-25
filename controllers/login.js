const UserModel = require('../models/user')

exports.findOne = (req, res) => {
	UserModel.findOne({
		Username: req.body.Username,
		Password: req.body.Password,
	})
		.then(user => {
			if (user === null) {
				res.status(404).send({
					message: 'User not found or wrong password',
				})
			} else {
				res.send(user)
			}
		})
		.catch(err => {
			res.status(500).send({ message: 'Error when find this user' })
		})
}
