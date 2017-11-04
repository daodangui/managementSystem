//定义返回的接口公用的字段

module.exports = {
	getUser: function(data){
		return {
			"status": 0,
			"msg": "数据请求成功",
			"data": data
		}
	}
}