define(['jquery', 'ejs', 'summernote', 'summernote-zh-CN'], function($, EJS, summernote, summernoteZHCN){
	summernoteZHCN($)
	var square = function(container){
		this.container = container || $('body')
		this.pageSize = 3
		this.init()
	}

	square.prototype = {
		init(){
			this.createDom()
		},

		createDom(){
			var pageSize = this.pageSize
			var pageNo = 1
			$.post('/api/square/getList', {
				pageSize,
				pageNo
			}, this.createEJS.bind(this))
		},

		createEJS(data){
			var html = new EJS({url: '/template/ltemplate/square.ejs'}).render({
					list: data.data.result,
					pageNo: data.data.pageNo,
					pageCount: Math.ceil(data.data.length / this.pageSize) 
				})
				this.pageLength = Math.ceil(data.data.length / this.pageSize) 
				this.container.html(html)
				this.info = this.container.find('.subjectInfo')
				this.bindEvents()
				$(document).ready(function(){
					$('#summernote').summernote({ 
						lang: 'zh-CN',
						 height: '400px',
						 callbacks: {
						 	onImageUpload: function(files){
						 		var data = new FormData()
						 		data.append('imgUp', files[0])
						 		this.imgUpToServer(data)
						 	}
						 }
						})
				})
				this.title = this.container.find('#subjectTitle')
				this.type = this.container.find('#subjectType')
		},

		imgUpToServer(data){
			console.log(this);
			$.ajax({
				url: '/api/square/accImgFromClient',
                type: 'POST',
				data: data,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    $('#summernote').summernote('insertImage',result.data.url);
                }
			})
		},

		clearInput(){
			this.title.val('')
			this.type.val('图文')
			$('#summernote').summernote('code', '')
		},

		bindEvents(){
			this.container.find('#postedSubject').on('click', this.postedSubject.bind(this))
			this.container.find('#writeSubject').on('click', this.clearInfo.bind(this))
			this.container.find('#writeSubject').on('click', this.clearInput.bind(this))
			this.container.find('.pagination').on('click', this.toPageNo.bind(this))
			this.container.find('.delSubject').on('click', this.delSubject.bind(this))
			this.container.find('.watchSubject').on('click', this.watchSubject.bind(this))
		},

		delSubject(e){
			$.post('/api/square/removeSubject',{
				id: $(e.target).closest('tr').attr('data-id')
			}, function(res){
				if(res.data.success){
					alert('删除成功')
					new square($('.container-fluid .row .main'))
				}
			})
		},

		watchSubject(e){
			var $this = this
			$.post('/api/square/queryOne',{
				id: $(e.target).closest('tr').attr('data-id')
			}, function(res){
				var { content, title, type} = res.data.result
				$this.title.val(title)
				$this.type.val(type)
				$('#summernote').summernote('code', content);
				$this.clearInfo()
				$this.container.find('#note-model').modal('show')
			})
		},

		toPageNo(e){
			var $this = this
			var pageSize = this.pageSize
			if(!isNaN(parseInt($(e.target).text()))){
				$.post('/api/square/getList', {
					pageSize,
					pageNo: $(e.target).text()
				}, $.proxy($this.createEJS, $this))
			}else{
				var index = $this.container.find('.pagination .active').index()
				if($(e.target).closest('li').hasClass('Back')){
					if(index != 1){
						$.post('/api/square/getList', {
							pageSize,
							pageNo: index - 1
						}, $.proxy($this.createEJS, $this))
					}
				}else{
					if(index != $this.pageLength){
						$.post('/api/square/getList', {
							pageSize,
							pageNo: index + 1
						}, $.proxy($this.createEJS, $this))
					}
				}
			}
		},

		clearInfo(){
			this.info.addClass('hidden')
			this.info.find('i').removeClass().addClass('fa fa-spinner loading')
			this.info.removeClass('text-success').addClass('text-muted').find('span').html('发布中')
		},

		postedSubject(){
			var $this = this
			this.info.removeClass('hidden')
			var content = $('#summernote').summernote('code')
			var title = $('#subjectTitle').val()
			var type = $('#subjectType').val()
			$.post('/api/square/addSubject', {
				createTime: new Date().toLocaleDateString(),
				imgUrl: [],
				content,
				title,
				type,
				replyCount: 0,
				username: window.username
			}, function(result){
				if(result.data.success){
					$this.info.find('i').removeClass().addClass('glyphicon glyphicon-ok-sign')
					$this.info.removeClass('text-muted').addClass('text-success').find('span').html('发布成功')
					$this.container.find('#note-model').modal('hide')
					setTimeout(function(){
						new square($('.container-fluid .row .main'))
					}, 500)
				}else{
					//数据保存失败
				}
			})
		}
	}

	return square
})