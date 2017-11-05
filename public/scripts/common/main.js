define(['jquery', 'ejs'], function($, EJS){
	var main = function(container){
		this.container = container || $('body')
		this.pageSize = 3
		this.init()
	}

	$.extend(main.prototype, {
		init(){
			this.createDom()
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
