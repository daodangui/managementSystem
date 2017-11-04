const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')

router.post('/users/login', userController.login)
router.post('/users/register', userController.register)
router.post('/users/logout', userController.logout)

module.exports = router