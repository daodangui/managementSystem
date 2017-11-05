define(['jquery', 'ejs'], function($, EJS){
	var personData = function(container){
		this.container = container || $('body')
		this.init()
	}

	personData.prototype = {
		init(){
			this.createDom()
		},

		createDom(){
			var html = new EJS({url: '/template/ltemplate/personData.ejs'}).render({})
			this.container.html(html)
			this.username = this.container.find('input[name=username]')
			this.password = this.container.find('input[name=password]')
			this.tel = this.container.find('input[name=tel]')
			this.email = this.container.find('input[name=email]')
			this.id = this.container.find('input[name=id]')
			this.initData()
			this.bindEvents()
		},

		initData(){
			var $this = this
			$.post('/api/users/isLogin', function(res){
				if(res.data.isLogin){
					$.post('/api/users/queryUser', {
						username: res.data.username
					}, function(res){
						$this.username.val(res.data.username)
						$this.tel.val(res.data.tel)
						$this.email.val(res.data.email)
						$this.id.val(res.data._id)

					})
				}else{
					console.error('用户未登录');
				}
			})
			
		},

		bindEvents(){
			this.container.find('#update').on('click', this.updateData.bind(this))
			this.container.find('input').on('focus', this.removeInfo.bind(this))
		},

		updateData(){
			var $this = this
			$.post('/api/users/updata', {
				_id: $this.id.val(),
				username: $this.username.val(),
				password: $this.password.val(),
				tel: $this.tel.val(),
				email: $this.email.val(),
			}, function(res){
				console.log(res);
				if(res.data.success){
					window.location.reload()
				}else{
					$this.alertInfo()
				}
			})
		},

		alertInfo(){
			this.container.find('#alertInfo').removeClass('hidden')
		},

		removeInfo(){
			this.container.find('#alertInfo').addClass('hidden')
		}
	}

	return personData
})