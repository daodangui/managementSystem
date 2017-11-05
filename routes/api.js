const express = require('express')
const router = express.Router()
//yp	图片处理相关
const upload = require('../utils/uploadimg');

const userController = require('../controller/user.js')

const sceneryController = require('../controller/scenery.js')

router.post('/users/login', userController.login)
router.post('/users/register', userController.register)
router.post('/users/logout', userController.logout)
router.post('/users/isLogin', userController.isLogin)



//热门景点的添加
router.post('/scenery/addScenery',  upload.single('logo'), sceneryController.addscenery);
router.get('/scenery/getScenerylist', sceneryController.getScenerylist);
router.get('/scenery/deleteScenery', sceneryController.deleteScenery);
router.get('/scenery/updateScenery', sceneryController.updateScenery);


//前端请求的数据
router.get('/scenery/felist', sceneryController.felist);



module.exports = router