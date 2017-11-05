const Scenery = require('../model/scenery.js');
const bcrypt = require('bcrypt-nodejs');
const {
	getUser
} = require('../utils/utils');

const addscenery = function(req, res, next) {
	var {
		sceneryName,
		satisfaction,
		summary,
		price,
		commentcount,
		tag,
		grade
	} = req.body;
	console.log('到路由');
	console.log(price);
	console.log(req.body.sceneryid);

	if(req.body.sceneryid) {
		console.log('修改');
		console.log(req.body.sceneryid);

		var setScenery = {
			sceneryName,
			satisfaction,
			summary,
			price,
			commentcount,
			tag,
			grade
		}
		if(req.file && req.file.filename) {
			setScenery.picture = req.file.filename;
		}

		Scenery.findByIdAndUpdate(req.body.sceneryid, {
			$set: setScenery
		}).then(() => {
			res.redirect('/index.html')
		})

	} else {
		console.log("ok");
		const willsaveScenery = new Scenery({
			picture: req.file && req.file.filename ? req.file.filename : '',
			sceneryName,
			satisfaction,
			summary,
			price,
			commentcount,
			tag,
			grade,
		});

		willsaveScenery.save().then(() => {
			res.redirect('/index.html');
		})
	}
}

const getScenerylist = function(req, res, next) {
	var pageSize = 3;
	var {
		pageNo
	} = req.query;
	Scenery.find({})
		.then((result) => {
			var documentSize = result.length;
			Scenery.find({})
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

const deleteScenery = function(req, res, next) {
	var {
		id
	} = req.query;
	Scenery.findByIdAndRemove(id)
		.then((result) => {
			res.json(getUser({
				success: true
			}))
		})
}

const updateScenery = function(req, res, next) {
	var {
		id
	} = req.query;
	Scenery.findOne({
			_id: id
		})
		.then((result) => {
			res.json(getUser(result))
		})
}

const felist = function(req, res, next) {
	Scenery.find({})
		.then((result) => {
			res.json(getUser(result))
		})
}

module.exports = {
	addscenery,
	getScenerylist,
	deleteScenery,
	updateScenery,
	felist
}