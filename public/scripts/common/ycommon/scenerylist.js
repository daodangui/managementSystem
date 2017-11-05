define(['jquery', 'ejs'], function($, EJS) {
	const sceneryList = function(container) {
		this.container = container || $('body')
		this.init()
	}

	$.extend(sceneryList.prototype, {
		init: function() {
			this.createDom();
		},

		createDom: function() {
			this.getScenertlist(1);
		},

		getScenertlist: function(pageNo) {
			$.ajax({
				url: '/api/scenery/getScenerylist',
				data:{
					pageNo:pageNo
				},
				success: this.handleGetscenerylist.bind(this)
			})
		},

		handleGetscenerylist: function(res) {
			var list = new EJS({
				url: '../../../template/ytemplate/scenerylist.ejs'
			});
			var html = list.render({
				scenerylist: res.data.result
			});
			this.container.html(html);
			
			//绑定删除和修改事件
			this.bindEvents();
			//触发绑定在scenerylist对象上的事件，将分页的信息传到pagination
			$(this).trigger(new $.Event('pagemsg', res.data))
		},
		
		bindEvents: function(){
			$('#sceneryList').on('click', this.handleManagelist.bind(this));
		},
		
		handleManagelist: function(e){
			var sceneryid = $(e.target).closest("tr").attr('sceneryid');
			if($(e.target).attr('data-tag')==='delete'){
				$.ajax({
					url:"/api/scenery/deleteScenery",
					data:{
						id: sceneryid
					},
					success: this.handledeletescenery.bind(this)
				});
			}
			if($(e.target).attr('data-tag')==='update'){
				$('#addsceneryForm').modal('show');
				$.ajax({
					url:"/api/scenery/updateScenery",
					data:{
						id: sceneryid
					},
					success: this.handleupdatescenery.bind(this)
				});
			}
		},
		
		handledeletescenery: function(res){
			if(res.data.success){
				window.location.reload();
			}
		},
		
		handleupdatescenery: function(res){
			$('#updateLogo').html(`<img src=/upload/${res.data.picture} width=30 height=30 />`);
			$('#sceneryid').val(res.data._id);
//			alert($('#sceneryid').val());
			$('#sceneryName').val(res.data.sceneryName);
//			alert($('#sceneryName').val());
			$('#satisfaction').val(res.data.satisfaction);
			$('#summary').val(res.data.summary);
			$('#price').val(res.data.price);
			$('#commentcount').val(res.data.commentcount);
			$('#tag').val(res.data.tag);
			$('#grade').val(res.data.grade);
		}
	})
	
	return sceneryList
})