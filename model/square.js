const db = require('../utils/database.js')

//定义schema，即域的数据类型
const schema = new db.Schema({
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
		require: true
	},
	createTime: {
		type: Date,
		require: true
	},
	imgUrl: {
		type: Array,
		require: false
	},
	type: {
		type: String,
		require: true
	},
	userId: {
		type: String,
		require: false
	},
	replyCount: {
		type: Number,
		require: false
	}
})

//定义 model
const Square = db.model('square', schema)

module.exports = Square