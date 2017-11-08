const Square = require('../model/square.js')
const bcrypt = require('bcrypt-nodejs')
const { getSquare } = require('../utils/utils')

const addSubject = function(req, res){
	var {createTime, imgUrl, content, title, type, replyCount, username} = req.body
	const willSaveSubject = new Square({
		createTime,
		imgUrl,
		content,
		title,
		type,
		username,
		replyCount: parseInt(replyCount)
	})
	willSaveSubject.save().then(()=>{
		res.json(getSquare({success: true}))
	})

}

const removeSubject = function(req, res){
	Square.findByIdAndRemove(req.body.id)
		.then((result)=>{
			res.json(getSquare({success: true}))
		})
}

const updateSubject = function(req, res){
	
}

const queryOne = function(req, res){
	var _id = req.body.id
	Square.findOne({_id})
		.then((result)=>{
			return res.json(getSquare({success: true, result}))
		})
}

const getList = function(req, res){
	var { pageSize, pageNo } = req.body
	Square.count({}, function(err, count){
		var length = count
		Square.find({})
			.skip((pageNo - 1) * pageSize)
			.limit(pageSize)
			.then((result)=>{
				var page = {
					length,
					result,
					pageNo
				}
				res.json(getSquare(page))
			})
	})
}

const accImgFromClient = function(req, res){
	

}

module.exports = {
	getList,
	addSubject,
	removeSubject,
	updateSubject,
	queryOne,
	accImgFromClient
}