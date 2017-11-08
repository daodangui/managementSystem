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
						req.session.username = username
						res.json(getUser({success: true, user}))
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
	const { username, password, email, tel, roles } = req.body
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
						tel,
						roles,
						status: 1
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

const isLogin = function(req, res){
	res.json(getUser({
	    isLogin: req.session.username ? true : false,
	    username: req.session.username
	  }))
}

const queryUser = function(req, res){
	User.findOne({username: req.body.username})
		.then((user)=>{
			if(user){
				res.json(getUser(user))
			}
		})
}

const getList = function(req, res){
	var { pageSize, pageNo } = req.body
	User.count({}, function(err, count){
		var length = count;
		User.find({})
			.skip((pageNo - 1) * pageSize)
			.limit(pageSize)
			.then((result)=>{
				var page = {
					length,
					result,
					pageNo
				}
				res.json(getUser(page))
			})
	})
}

const updata = function(req, res){
	if(req.body.status){
		var status = req.body.status
		var _id = req.body.id
		User.findByIdAndUpdate(_id, {
			$set: {
				status: parseInt(status)
			}
		}).then(()=>{
			res.json(getUser({success: true}))
		})
	}else{
		var { _id, username, password, tel, email} = req.body
		User.findOne({username})
			.then((user)=>{
				if(user && user.username != req.session.username){
					res.json(getUser({success: false}))
				}else{
					bcrypt.hash(password, null, null, function(err, password){
						User.findByIdAndUpdate(_id, {
							$set: {
								username,
								password,
								tel,
								email
							}
						}).then(()=>{
							req.session.username = username
							res.json(getUser({success: true}))
						})
					})
				}
			})
	}
}

module.exports = {
	login,
	register,
	logout,
	isLogin,
	getList,
	queryUser,
	updata
}