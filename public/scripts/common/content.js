define(['jquery','ejs', 'main', 'personData', 'square'], function($, EJS, main, personData, square){
	var content = function(container) {
		this.container = container || $('body')
		this.init()
	}

	$.extend(content.prototype, {
		init: function(){
			this.createDom()
			this.bindEvents()
		},

		createDom: function(){
			this.container.find('.container').remove()
			var html = new EJS({url: '/template/content.ejs'}).render({})
			this.container.append(html)
		},


		bindEvents(){
			this.container.find('#personData').on('click', this.openPersonDataPage.bind(this))
			this.container.find('#allUser').on('click', this.openAllUserList.bind(this))
			this.container.find('#squareBtn').on('click', this.openSquareList.bind(this))
		},

		openSquareList(){
			new square($('.container-fluid .row .main'))
		},

		openPersonDataPage(){
			new personData($('.container-fluid .row .main'))
		},

		openAllUserList(){
			new main($('.container-fluid .row .main'))
		}

	})
	
	return content
})