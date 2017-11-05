define(['jquery', 'ejs', 'summernote', 'summernote-zh-CN'], function($, EJS, summernote, summernoteZHCN){
	summernoteZHCN($)
	var square = function(container){
		this.container = container || $('body')
		this.init()
	}

	square.prototype = {
		init(){
			this.createDom()
		},

		createDom(){
			var html = new EJS({url: '/template/ltemplate/square.ejs'}).render({})
			this.container.html(html)
			this.info = this.container.find('.subjectInfo')
			this.bindEvents()
			$(document).ready(function(){
				$('#summernote').summernote({ lang: 'zh-CN', height: '400px'})
			})
		},

		bindEvents(){
			this.container.find('#postedSubject').on('click', this.postedSubject.bind(this))
			this.container.find('#writeSubject').on('click', this.clearInfo.bind(this))
		},

		clearInfo(){
			this.info.addClass('hidden')
			$this.info.find('i').removeClass().addClass('fa fa-spinner loading')
			$this.info.removeClass('text-success').addClass('text-muted').find('span').html('发布中')
		},

		postedSubject(){
			var $this = this
			this.info.removeClass('hidden')
			var content = $('#summernote').summernote('code')
			var title = $('#subjectTitle').html()
			var type = $('#subjectType').val()
			$.post('/api/square/addSubject', {
				createTime: new Date().toLocaleDateString(),
				imgUrl: [],
				content,
				title,
				type,
				replyCount: 0
			}, function(result){
				if(result.data.success){
					$this.info.find('i').removeClass().addClass('glyphicon glyphicon-ok-sign')
					$this.info.removeClass('text-muted').addClass('text-success').find('span').html('发布成功')
				}else{

				}
			})
		}
	}

	return square
})