const express = require('express')
const router = express.Router()

const User = require('../controllers/user')

router.post('/', User.create)

router.get('/:id', User.findOne)

router.get('/', User.findAll)

router.put('/', User.update)

router.delete('/:id', User.delete)
module.exports = router
