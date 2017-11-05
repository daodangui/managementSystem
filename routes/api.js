const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const squareController = require('../controller/square.js')

//用户相关路由
router.post('/users/login', userController.login)
router.post('/users/register', userController.register)
router.post('/users/logout', userController.logout)
router.post('/users/isLogin', userController.isLogin)
router.post('/users/getList', userController.getList)
router.post('/users/queryUser', userController.queryUser)
router.post('/users/updata', userController.updata)

//大广场相关路由
router.post('/square/getList', squareController.getList)
router.post('/square/addSubject', squareController.addSubject)
router.post('/square/removeSubject', squareController.removeSubject)
router.post('/square/updateSubject', squareController.updateSubject)
router.post('/square/queryOne', squareController.queryOne)

module.exports = router
