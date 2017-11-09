define(['jquery', 'ejs','recommendlist','pagination'], function($, EJS,recommendlist,pagination){
	var recommend = function(container){
		this.container = container || $('body')
		this.init()
	}
	
	$.extend(recommend.prototype, {
		init: function(){
			this.createDom();
			this.createForm();
			this.formShow();
		},

		createDom: function(){
			var html = new EJS({url: '/template/ytemplate/yrecommend.ejs'}).render({})
			this.container.html(html)
			//初始化景点列表
			this.initRecommendlist();
		},
		
		initRecommendlist: function(){
			this.list = new recommendlist($("#recommendList"));
			$(this.list).on('pagemsg', this.handlePagination.bind(this));
		},
		
		handlePagination: function(res){
			this.pagination = new pagination($('#paginationCon'), res)
			$(this.pagination).off('pageNochange').on('pageNochange', this.getScenerylist.bind(this))
		},
		
		getScenerylist: function(data){
			this.list.getScenertlist(data.pageno);
		},
		
		createForm: function(){
			var html = new EJS({url: '/template/ytemplate/recommendForm.ejs'}).render({})
			$("body").append(html);
			//顺序很重要
			this.addSubmitEvent();
		},
		
		formShow: function(){
			$('#addscenery').on('click', this.addsceneryFormShow.bind(this));
		},
		
		addsceneryFormShow: function(){
			$('#addrecommedForm').modal('show');
			$('#sceneryid').val('');
			$('#updateLogo').html('');
			$('#sceneryName').val('');
			$('#satisfaction').val('');
			$('#summary').val('');
			$('#price').val('');
			$('#commentcount').val('');
			$('#tag').val('');
			$('#grade').val('');
		},
		
		addSubmitEvent: function(){
			$('#submitBtn').on('click', this.handleSubmitForm.bind(this));
		},
		
		handleSubmitForm: function(){
			alert('cheng-recommend');
			$('#postRecommendForm').submit();
		}
	})
	return recommend
})