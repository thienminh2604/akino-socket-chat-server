const express = require('express')
const router = express.Router()
const User = require('../controllers/login')

router.post('/', User.findOne)

module.exports = router
