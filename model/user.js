const db = require('../utils/database.js')

//定义schema，即域的数据类型
const schema = new db.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String
	}
})

//定义 model
const User = db.model('users', schema)

module.exports = User