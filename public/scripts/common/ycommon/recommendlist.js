define(['jquery', 'ejs','recommend'], function($, EJS, recommend) {
	const recommendlist = function(container) {
		this.container = container || $('body')
		this.init()
	}

	$.extend(recommendlist.prototype, {
		init: function() {
			this.createDom();
		},

		createDom: function() {
			this.getRecommendlist(1);
		},

		getRecommendlist: function(pageNo) {
			$.ajax({
				url: '/api/recommend/getRecommendlist',
				data:{
					pageNo:pageNo
				},
				success: this.handleGetrecommendlist.bind(this)
			})
		},

		handleGetrecommendlist: function(res) {
			var list = new EJS({
				url: '../../../template/ytemplate/recommendlist.ejs'
			});
			var html = list.render({
				recommendlist: res.data.result
			});
			this.container.html(html);
			//绑定删除和修改事件
			this.bindEvents();
			//触发绑定在scenerylist对象上的事件，将分页的信息传到pagination
			$(this).trigger(new $.Event('pagemsg', res.data))
		},
		
		bindEvents: function(){
			//事件委托，绑定在tbody上
			$('#recommendList').on('click', this.handleManagelist.bind(this));
			//绑定搜索事件
			$('#searchBtn').on('click', this.handleSearch.bind(this));
		},
		
		handleSearch: function(){
			var conditions = $('#searchForm').find('option:selected').text();
			var content = $("#inputPassword").val();
			$.ajax({
					url:"/api/recommend/findRecommend",
					data:{
						conditions : conditions,
						content : content
					},
					//直接调用handleGetscenerylist不必重新写
					success: this.handleRecommendcenery.bind(this)
				});
		},
		
		handleRecommendcenery: function(res){
			var list = new EJS({
				url: '../../../template/ytemplate/recommendlist.ejs'
			});
			var html = list.render({
				recommendlist: res.data
			});
			this.container.html(html);
			//绑定删除和修改事件
			this.bindEvents();
			//触发绑定在scenerylist对象上的事件，将分页的信息传到pagination
			$(this).trigger(new $.Event('pagemsg', res.data))
		},
		
		
		handleManagelist: function(e){
			var recommendid = $(e.target).closest("tr").attr('recommendid');
			if($(e.target).attr('data-tag')==='delete'){
				$.ajax({
					url:"/api/recommend/deleteRecommend",
					data:{
						id: recommendid
					},
					success: this.handledeleterecommend.bind(this)
				});
			}
			if($(e.target).attr('data-tag')==='update'){
				$('#addrecommedForm').modal('show');
				$.ajax({
					url:"/api/recommend/updateRecommend",
					data:{
						id: recommendid
					},
					success: this.handleupdaterecommend.bind(this)
				});
			}
		},
		
		handledeleterecommend: function(res){
			if(res.data.success){
				$('#recommend').trigger("click");
			}
		},
		
		handleupdaterecommend: function(res){
			$('#updateImg').html(`<img src=/upload/${res.data[0].SceneryImg} width=30 height=30 />`);
			$('#recommendid').val(res.data[0]._id);
			$('#SceneryName').val(res.data[0].SceneryName);
			$('#Satisfaction').val(res.data[0].Satisfaction);
			$('#Describe').val(res.data[0].Describe);
			$('#LowPrice').val(res.data[0].LowPrice);
			$('#CommentNumber').val(res.data[0].CommentNumber);
			$('#Distance').val(res.data[0].Distance);
		}
	})
	
	return recommendlist
})