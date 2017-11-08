define(['jquery', 'ejs'], function($, EJS){
	var main = function(container){
		this.container = container || $('body')
		this.pageSize = 3
		this.init()
	}

	$.extend(main.prototype, {
		init(){
			this.createDom();
		},

		createDom: function(){
			$.post('/api/users/getList', {
				pageSize: this.pageSize,
				pageNo:1
			}, $.proxy(this.createEJS, this))
		},

		bindEvents(){
			var $this = this
			var pageSize = this.pageSize
			this.container.find('.pagination').on('click', function(e){
					if(!isNaN(parseInt($(e.target).text()))){
						$.post('api/users/getList', {
							pageSize,
							pageNo: $(e.target).text()
						}, $.proxy($this.createEJS, $this))
					}else{
						var index = $this.container.find('.pagination .active').index()
						if($(e.target).closest('li').hasClass('Back')){
							if(index != 1){
								$.post('api/users/getList', {
									pageSize,
									pageNo: index - 1
								}, $.proxy($this.createEJS, $this))
							}
						}else{
							if(index != $this.pageLength){
								$.post('api/users/getList', {
									pageSize,
									pageNo: index + 1
								}, $.proxy($this.createEJS, $this))
							}
						}
					}
					
				})
			this.container.find('.embargo').on('click', this.embargo.bind(this))
		},

		embargo(e){
			var text = $(e.target).text()
			if(text == '封禁'){
				var id = $(e.target).closest('tr').attr('data-id')
				$.post('/api/users/updata', {
					id,
					status: 0
				}, function(res){
					if(res.data.success){
						$(e.target).closest('tr').addClass('danger')
						$(e.target).text("解禁")
					}
					
				})
			}else{
				var id = $(e.target).closest('tr').attr('data-id')
				$.post('/api/users/updata', {
					id,
					status: 1
				}, function(res){
					if(res.data.success){
						$(e.target).closest('tr').removeClass('danger')
						$(e.target).text("封禁")
					}
				})
			}
			
		},

		createEJS: function(data){
			var html = new EJS({url: '/template/ltemplate/main.ejs'}).render({
				list: data.data.result,
				pageNo: data.data.pageNo,
				pageCount: Math.ceil(data.data.length / this.pageSize) 
			})
			this.pageLength = Math.ceil(data.data.length / this.pageSize) 
			this.container.html(html)
			this.bindEvents()
		}
	})
	return main
})
