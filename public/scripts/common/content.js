define(['jquery','ejs', 'main', 'personData', 'square', 'hot','recommend'], function($, EJS, main, personData, square, hot,recommend){
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
			$('#hot').on('click', this.showHotTable.bind(this));
			$('#recommend').on('click', this.showrecommendtable.bind(this));
			
		},

		openSquareList(){
			new square($('.container-fluid .row .main'))
		},

		openPersonDataPage(){
			new personData($('.container-fluid .row .main'))
		},

		openAllUserList(){
			new main($('.container-fluid .row .main'))
		},

		showHotTable: function(){
			new hot($('.container-fluid .row .main'));
		},
		
		showrecommendtable: function(){
			new recommend($('.container-fluid .row .main'));
		}

	})
	
	return content
})