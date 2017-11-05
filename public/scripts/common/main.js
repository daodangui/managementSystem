define(['jquery', 'ejs'], function($, EJS){
	var main = function(container){
		this.container = container || $('body')
		this.init()
	}

	$.extend(main.prototype, {
		init(){
			this.createDom();
		},

		createDom: function(){
			var html = new EJS({url: '/template/main.ejs'}).render({})
			this.container.html(html)
		}
	})
	return main
})
