define(['jquery','ejs'], function($, EJS){
	var Header = function(options){
		this.container = $('body')
		this.init(options)
	}

	$.extend(Header.prototype, {
		init: function(options){
			this.createDom(options)
		},

		createDom: function(options){
			var html = new EJS({url: '/template/header.ejs'}).render({
				isLogin: options.isLogin,
				username: options.username
			})
			this.container.find('.pageHead').remove()
			this.container.prepend(html)

			this.bindEvents()
		},

		bindEvents: function(){
			this.container.find('#logoutBtn').on('click', function(){
				$.ajax({
					url: '/api/users/logout',
					type: 'post',
					success: function(res){
						if(res.data.success){
							window.location.reload()
						}
					}
				})
			})
		}

	})
	
	return  Header
})
