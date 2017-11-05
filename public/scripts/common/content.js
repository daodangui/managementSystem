define(['jquery','ejs','hot'], function($, EJS, hot){
	var content = function(container) {
		this.container = container || $('body')
		this.init()
	}

	$.extend(content.prototype, {
		init: function(){
			this.createDom();
			this.bindEvents();
		},

		createDom: function(){
			this.container.find('.container').remove()
			var html = new EJS({url: '/template/content.ejs'}).render({})
			this.container.append(html)
		},
		
		bindEvents: function(){
			$('#hot').on('click', this.showHotTable.bind(this));
		},
		showHotTable: function(){
			new hot($('.container-fluid .row .main'));
		}
	})
	
	return content
})