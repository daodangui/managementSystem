define(['jquery', 'ejs', 'sceneryList', 'pagination'], function($, EJS, sceneryList, pagination) {
	var initscenery = function() {
		this.init()
	}

	$.extend(initscenery.prototype, {
		init: function() {
			this.createDom();
		},
		createDom: function() {
			//初始化景点列表
			this.initscenerylist();
		},

		initscenerylist: function() {
			this.list = new sceneryList($("#sceneryList"));
			$(this.list).on('pagemsg', this.handlePagination.bind(this));
		},

		handlePagination: function(res) {
			this.pagination = new pagination($('#paginationCon'), res)
			$(this.pagination).off('pageNochange').on('pageNochange', this.getScenerylist.bind(this))
		},

		getScenerylist: function(data) {
			this.list.getScenertlist(data.pageno);
		}
	})

	return initscenery
})