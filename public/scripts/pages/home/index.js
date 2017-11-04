var Home = function(){
	this.init()
}

$.extend(Home.prototype, {
	init: function(){
		this.createHeader()
	},

	createHeader: function(){
		this.header = new Header({
			isLogin: false,
			username: ''
		})
	}
})

new Home()