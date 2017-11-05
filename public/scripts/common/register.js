define(['jquery', 'ejs', 'header', 'content', 'main', 'bootstrap'], function($, EJS, Header, content, main){
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
			this.confirmpwd = $('#register-model input[name=confirmpwd]')
			this.tel = $('#register-model input[name=tel]')
			this.email = $('#register-model input[name=email]')
		},

		bindEvents: function(){
			this.toRegister.on('click', $.proxy(this.handleRegister, this))
			this.confirmpwd.on('blur', $.proxy(this.verifypwd, this))
			this.tel.on('blur', $.proxy(this.verifytel, this))
			this.username.on('input', $.proxy(this.clearAlertInfo, this))
		},

		verifypwd: function(){
			if(this.password.val() != this.confirmpwd.val()){
				this.container.find('#register-model .verifyInfo').html('两次密码输入不一致')
				this.container.find('#register-model .alertInfo>span').removeClass('hidden')
			}else{
				this.clearAlertInfo()
			}
		},

		verifytel(){
			if(!/^1[34578]\d{9}$/.test(this.tel.val())){
				this.container.find('#register-model .verifyInfo').html('请输入有效手机号码')
				this.container.find('#register-model .alertInfo>span').removeClass('hidden')
			}else{
				this.clearAlertInfo()
			}
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
					tel: this.tel.val(),
					email: this.email.val(),
					roles: 1
				}),
				success: this.handleRegisterSucc.bind(this)
			})
		},

		handleRegisterSucc: function(res){
			if(res.data.success){
				this.container.find('#register-model').modal('hide')
				this.container.find('#login-model').modal('show')
				this.username.val('')
				this.password.val('')
				this.email.val('')
				this.tel.val('')
				this.confirmpwd.val('')
			}else{
				this.container.find('#register-model .verifyInfo').html('用户名已存在');
				this.container.find('#register-model .alertInfo>span').removeClass('hidden')
			}
		}
	})

	return register
})
