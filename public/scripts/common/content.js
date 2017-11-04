define(['jquery','ejs'], function($, EJS){
	var content = function(container) {
		this.container = container || $('body')
		this.init()
	}

	$.extend(content.prototype, {
		init: function(){
			this.createDom()
		},

		createDom: function(){
			this.container.find('.container').remove()
			var html = new EJS({url: '/template/content.ejs'}).render({})
			this.container.append(html)
		}
	})
	
	return content
})