var login = function(container){
	this.container = container || $('body')
	this.init()
}

$.extend(login.prototype, {
	init: function(){
		this.createDom()

		this.toLogin = $('#toLogin')
		this.username = $('#login-model input[name=username]')
		this.password = $('#login-model input[name=password]')

		this.bindEvents()
	},

	createDom: function(){
		var html = new EJS({url: '/template/login.ejs'}).render({})
		this.container.append(html)
	},

	bindEvents: function(){
		this.toLogin.on('click', this.handleLogin.bind(this))
		this.username.on('focus', $.proxy(this.clearAlertInfo, this))
	},

	clearAlertInfo: function(){
		this.container.find('#login-model .alertInfo>span').addClass('hidden')
	},

	handleLogin: function(){
		$.ajax({
			url: '/api/users/login',
			type: 'post',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				username: this.username.val(),
				password: this.password.val()
			}),
			success: this.handleLoginsucc.bind(this)
		})
	},

	handleLoginsucc: function(res){
		if(res.data.success){
			this.container.find('#login-model').modal('hide')
			new Header({
				isLogin: true,
				username: this.username.val()
			})
			this.username.val('')
			this.password.val('')
		}else{
			this.container.find('#login-model .alertInfo>span').removeClass('hidden')
		}
	}
})