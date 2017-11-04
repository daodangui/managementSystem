//用户数据库逻辑操作

const User = require('../model/user.js')
const bcrypt = require('bcrypt-nodejs')
const { getUser } = require('../utils/utils')

const login = function(req, res){
	const { username, password } = req.body
	User.findOne({username})
		.then((user)=>{
			if(user){
				bcrypt.compare(password, user.password, function(err, result){
					if(result){
						res.json(getUser({success: true}))
						req.session.username = username
					}else{
						res.json(getUser({success: false}))
					}
				})
			}else{
				res.json(getUser({success: false}))
			}
		})
}

const register = function(req, res){
	const { username, password, email, roles } = req.body
	User.findOne({username})
		.then((user)=>{
			if (user) {
				res.json(getUser({success: false}))
			}else{
				//使用bcrypt加密密码保证用户信息的安全性
				bcrypt.hash(password, null, null, function(err, password){
					const willSaveUser = new User({
						username,
						password,
						email,
						roles
					})
					//数据存入数据库
					willSaveUser.save().then(()=>{
						res.json(getUser({success: true}))
					})
				})
			}
		})
}

const logout = function(req, res){
	req.session.username = null
	res.json(getUser({success: true}))
}

module.exports = {
	login,
	register,
	logout
}