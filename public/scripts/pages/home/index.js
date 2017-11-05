require(['../../config'], function(){
	require(['jquery','header','content','main', 'login', 'register'], function($,Header,content,main,login,register){

		var Home = function(container){
			this.container = container || $('body')
			this.init()
		}

		$.extend(Home.prototype, {
			init: function(){
				this.isLogin()
			},

			createHeader: function(isLogin, username){
				this.header = new Header({
					isLogin: isLogin,
					username: username
				})
				new login()
				new register()
			},

			isLogin(){
				var $this = this
				$.post('/api/users/isLogin', function(res){
					if(res.data.isLogin){
						window.username = res.data.username
						$this.createHeader(true, res.data.username)
						$this.loadContent()
					}else{
						$this.createHeader(false)
					}
				})
			},

			loadContent(){
				new content()
				new main($('.container-fluid .row .main'))
			}
		})

		new Home()	
	})
})

