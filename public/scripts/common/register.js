var register = function(container){
	this.container = container || $('body')
	this.init()
}

$.extend(register.prototype, {
	init: function(){
		this.createDom()
		this.bindEvents()
	},

	createDom: function(){
		var html = new EJS({url: '/template/register.ejs'}).render({})
		this.container.append(html)

		this.toRegister = $('#toRegister')

		this.username = $('#register-model input[name=username]')
		this.password = $('#register-model input[name=password]')
		this.email = $('#register-model input[name=email]')
	},

	bindEvents: function(){
		this.toRegister.on('click', $.proxy(this.handleRegister, this))
		this.username.on('focus', $.proxy(this.clearAlertInfo, this))
	},

	clearAlertInfo: function(){
		this.container.find('#register-model .alertInfo>span').addClass('hidden')
	},

	handleRegister: function(){
		$.ajax({
			url: '/api/users/register',
			type: 'post',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				username: this.username.val(),
				password: this.password.val(),
				email: this.email.val()
			}),
			success: this.handleRegisterSucc.bind(this)
		})
	},

	handleRegisterSucc: function(res){
		if(res.data.success){
			this.container.find('#register-model').modal('hide')
			new Header({
				isLogin: true,
				username: this.username.val()
			})
			this.username.val('')
			this.password.val('')
			this.email.val('')
		}else{
			this.container.find('#register-model .alertInfo>span').removeClass('hidden')
		}
	}
})