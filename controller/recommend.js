const Recommend = require('../model/recommend.js');
const bcrypt = require('bcrypt-nodejs');
const {
	getUser
} = require('../utils/utils');

const addRecommend = function(req, res, next) {
	var {
		CommentNumber,
		Satisfaction,
		Describe,
		LowPrice,
		SceneryName,
		Distance
	} = req.body;

	const willsaveRecommend = new Recommend({
		SceneryImg: req.file && req.file.filename ? req.file.filename : '',
		SceneryName,
		Satisfaction,
		Describe,
		LowPrice,
		CommentNumber,
		Distance
	});

	willsaveRecommend.save().then(() => {
		res.json(getUser({
				success: true
			}))
	})
}

//获取推荐景点的列表数据
const getRecommendlist = function(req, res, next) {
	var pageSize = 3;
	var {
		pageNo
	} = req.query;
	Recommend.find({})
		.then((result) => {
			var documentSize = result.length;
			Recommend.find({})
				.skip((pageNo - 1) * pageSize)
				.limit(pageSize)
				.then((result) => {
					var page = {
						result,
						pageCount: Math.ceil(documentSize / pageSize),
						pageNo: parseInt(pageNo, 10)
					}
					res.json(getUser(page))
				})
				
		})
}

const deleteRecommend = function(req, res ,next){
	var { id } = req.query;
	Recommend.findOne({
		_id : id
	})
	Recommend.findByIdAndRemove(id)
		.then((result)=>{
			res.json(getUser({success:true}))
		})
}


const updateRecommend = function(req,res,next){
	var { id } = req.query;
	Recommend.find({})
		.then((result)=>{
			res.json(getUser(result))
		})
}


const findRecommend = function(req,res,next){
	var pageSize = 8;
	var {
		content,
		conditions
	} = req.query;
	var pageNo = 1;
	if(conditions == '景点名称') {
		Recommend.find({
				SceneryName: eval('/' + content + '/')
			})
			.then((result) => {
				res.json(getUser(result))
			})
	}
	if(conditions == '价格') {
		Recommend.find({
				LowPrice: {
					$gte: content
				}
			})
			.then((result) => {
				res.json(getUser(result))
			})
	}
	if(conditions == '距离') {
		Recommend.find({
				Distance: {
					$gte: content
				}
			})
			.then((result) => {
				res.json(getUser(result))
			})
	}
}

module.exports = {
	addRecommend,
	getRecommendlist,
	deleteRecommend,
	updateRecommend,
	findRecommend
}