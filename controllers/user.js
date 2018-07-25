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
		.sort({ _id: 1 })
		.then(users => res.send(users))
		.catch(err => {
			console.log(err)
			return res.status(500).send({ message: 'Error when finding' })
		})
}

exports.findOne = (req, res) => {
	UserModel.findById(req.params.id)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				})
			}
			return res.send(user)
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				})
			}
			return res.status(500).send({ message: 'Error when finding!' })
		})
}

exports.update = (req, res) => {
	UserModel.findByIdAndUpdate(
		req.body.id,
		{
			Password: req.body.Password,
			Name: req.body.Name,
			DOB: req.body.DOB,
			Permission: req.body.Permission,
		},
		{ new: true }
	)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				})
			}

			return res.send(user)
		})
		.catch(err => {
			console.log(err)

			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				})
			}

			return res.status(500).send({
				message: 'Error when finding!',
			})
		})
}

exports.delete = (req, res) => {
	UserModel.findByIdAndRemove(req.params.id)
		.then(result => {
			if (!result) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				})
			}
			return res.send({ message: 'Deleted successfully!' })
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				})
			}
			return res.status(500).send({
				message: `Error when delete with id ${req.params.id}`,
			})
		})
}
