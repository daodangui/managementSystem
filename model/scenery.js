const db = require('../utils/database.js')

//定义schema，即域的数据类型
const schema = new db.Schema({
	commentcount: {
		type: Number,
		required: true
	},
	satisfaction: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	grade: {
		type: Number,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	tag: {
		type: String,
		required: true
	},
	sceneryName: {
		type: String,
		required: true
	}
})

//定义 model
const Scenery = db.model('scenerys', schema)

module.exports = Scenery