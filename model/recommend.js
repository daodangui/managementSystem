const db = require('../utils/database.js')

//定义schema，即域的数据类型
const schema = new db.Schema({
	CommentNumber: {
		type: Number,
		required: true
	},
	Satisfaction: {
		type: Number,
		required: true
	},
	LowPrice: {
		type: Number,
		required: true
	},
	Distance: {
		type: Number,
		required: true
	},
	Describe: {
		type: String,
		required: true
	},
	SceneryImg: {
		type: String,
		required: true
	},
	SceneryName: {
		type: String,
		required: true
	}
})

//定义 model
const Recommend = db.model('Recommends', schema)

module.exports = Recommend