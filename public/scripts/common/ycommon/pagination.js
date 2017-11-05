define(['jquery', 'ejs'], function($, EJS) {
	const pagination = function(container, res) {
		this.container = container || $("body");
		this.res = res || {};
		this.init();
	}

	$.extend(pagination.prototype, {
		init: function() {
			this.createDom();
		},

		createDom: function() {
			var html = new EJS({
				url: '../../../template/ytemplate/pagination.ejs'
			}).render({
				pageCount: this.res.pageCount,
				pageNo: this.res.pageNo
			})

			this.container.html(html);

			$('#paginationCon').off('click').on('click', this.handleChangpage.bind(this));
		},

		handleChangpage: function(e) {
			var li = $(e.target).closest('li');
			var currentpage = li.attr('pageno');
			if(currentpage != this.res.pageNo) {
				$(this).trigger(new $.Event('pageNochange', {
					pageno: currentpage
				}))
			}

		}
	})
	return pagination
})