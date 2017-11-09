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
		res.redirect('/index.html');
	})
}

//获取推荐景点的列表数据
const getRecommendlist = function(req, res, next) {
	var {
		pageNo
	} = req.body;
	console.log(pageNo)
	Recommend.find({})
		.then((result) => {

			var page = {
				result,
				pageCount: 2,
				pageNo: 1
			}
			res.json(getUser(page))
		})
}

module.exports = {
	addRecommend,
	getRecommendlist
}