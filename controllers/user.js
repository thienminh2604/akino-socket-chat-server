const UserModel = require('../models/user')

exports.create = async (req, res) => {
	if (!req.body.Username) {
		return res.status(400).json({
			message: 'Empty info',
		})
	}

	const [err, tempUser] = await to(
		UserModel.findOne({ Username: req.body.Username })
	)

	if (tempUser) {
		return res.status(400).json({ message: 'Account already exists' })
	}

	const newUser = new UserModel({
		Username: req.body.Username,
		Password: req.body.Password,
		Name: req.body.Name || '',
		DOB: req.body.DOB || 0,
		Permission: req.body.Permission || 0,
	})

	newUser
		.save()
		.then(user => res.send(user))
		.catch(err => {
			console.log(err)
			return res.status(500).send({ message: 'Error when creating!' })
		})
}

exports.findAll = (req, res) => {
	UserModel.find()
		.then(users => res.send(users))
		.catch(err => {
			console.log(err)
			return res.status(500).send({ message: 'Error when finding' })
		})
}

exports.findOne = (req, res) => {
	UserModel.findById(req.params.id)
		.then(user => res.send(user))
		.catch(err => {
			console.log(err)
			return res.status(500).send({ message: 'user not found' })
		})
}

exports.update = (req, res) => {
	UserModel.findOneAndUpdate(
		{ Username: req.body.Username },
		{ $set: { Password: req.body.Password, Name: req.body.Name } },
		{ new: true },
		(err, user) => {
			if (err) res.status(500).send({ message: 'Update false' })
			else {
				if (user === null) {
					res.status(500).send({ message: 'User not found' })
				} else res.send(user)
			}
		}
	)
}

exports.delete = (req, res) => {
	UserModel.findOne({ Username: req.params.id }, (err, user) => {
		if (err) res.status(500).send({ message: 'User not found' })
		else {
			if (user == null) {
				res.status(400).send({ message: 'user not found' })
			} else {
				UserModel.deleteOne({ Username: req.params.id }, err => {
					if (err)
						res.status(400).send({
							message: 'error when deleting this user',
						})
					else {
						res.status(200).send({ message: 'Delete success' })
					}
				})
			}
		}
	})
}
