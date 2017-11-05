const Square = require('../model/square.js')
const bcrypt = require('bcrypt-nodejs')
const { getSquare } = require('../utils/utils')

const addSubject = function(req, res){
	var {createTime, imgUrl, content, title, type, replyCount} = req.body
	const willSaveSubject = new Square({
		createTime,
		imgUrl,
		content,
		title,
		type,
		replyCount: parseInt(replyCount)
	})
	willSaveSubject.save().then(()=>{
		res.json(getSquare({success: true}))
	})

}

const removeSubject = function(req, res){

}

const updateSubject = function(req, res){
	
}

const queryOne = function(req, res){
	
}

const getList = function(req, res){

}

module.exports = {
	getList,
	addSubject,
	removeSubject,
	updateSubject,
	queryOne
}