define(['jquery', 'ejs', 'initscenery', 'pagination'], function($, EJS, initscenery, pagination) {
	var hot = function(container) {
		this.container = container || $('body')
		this.init()
	}

	$.extend(hot.prototype, {
		init: function() {
			this.createDom();
			this.createForm();
			this.formShow();
		},

		createDom: function() {
			var html = new EJS({
				url: '/template/ytemplate/yhot.ejs'
			}).render({})
			
			this.container.html(html)
			//初始化景点列表
			new initscenery();
//			this.initscenerylist();
		},

//		initscenerylist: function() {
//			this.list = new sceneryList($("#sceneryList"));
//			$(this.list).on('pagemsg', this.handlePagination.bind(this));
//		},
//
//		handlePagination: function(res) {
//			this.pagination = new pagination($('#paginationCon'), res)
//			$(this.pagination).off('pageNochange').on('pageNochange', this.getScenerylist.bind(this))
//		},
//
//		getScenerylist: function(data) {
//			this.list.getScenertlist(data.pageno);
//		},

		createForm: function() {
			var html = new EJS({
				url: '/template/ytemplate/sceneryForm.ejs'
			}).render({})
			$("body").append(html);
			//顺序很重要
			this.addSubmitEvent();
		},

		formShow: function() {
			$('#addscenery').on('click', this.addsceneryFormShow.bind(this));
		},

		addsceneryFormShow: function() {
			$('#addsceneryForm').modal('show');
			$('#logo').val('');
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

		addSubmitEvent: function() {
			$('#submitBtn').off('click').on('click', this.handleSubmitForm.bind(this));
		},

		handleSubmitForm: function(e) {
			var form = new FormData(document.getElementById("postSceneryForm"));
			$.ajax({
					url:"/api/scenery/addScenery",
					type : "post",
					data:form,
					processData:false,
               		contentType:false,
					success: this.commitform.bind(this)
				});

			$('#addsceneryForm').modal('hide');
//			$('#postSceneryForm').submit();
			this.websocketclient();
		},
		
		commitform: function(res){
			if(res.data.success){
				$('#hot').trigger('click');
			}
		},

		websocketclient: function() {
			var ws = new WebSocket('ws://127.0.0.1:8088');
			ws.onopen = function() {
				ws.send("大家好")
			}
			ws.onmessage = function(event) {
				console.log(event.data);
			}
		},
	})

	return hot
})