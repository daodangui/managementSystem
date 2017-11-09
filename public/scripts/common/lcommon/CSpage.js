define(['jquery', 'ejs'], function($, EJS){
	var CSpage = function(container){
		this.container = container || $('body')
		this.init()
	}

	CSpage.prototype = {
		init(){
			this.ws = null;
			this.user = {
				username : window.username,
				roles: 1,
				content: '',
				userNum: 0
			}
			this.createDom()
		},

		createDom(){
			var html = new EJS({ url: '/template/ltemplate/Cspage.ejs'}).render({})
			this.container.html(html)
			this.webSocket()
			this.bindEvents()
		},

		bindEvents(){
			this.container.find('#sendMsg').on('click', this.wsSendMsg.bind(this))
		},

		webSocket(){
			var $this = this
			this.ws = new WebSocket('ws://localhost:5000')
			this.ws.onmessage = function(msg){
				console.log(msg.data);
				var k = 0;
				$('#msgList').children().each(function(index, element){
					if($(element).children().eq(1).text() == msg.data.username){
						k =1;
						$(element).children().eq(2).text(msg.data.content)
						$(element).children().eq(3).text(parseInt($(element).children().eq(3).text() + 1))
					}
				})
				if(k == 0){
					this.createMsgListDOM(msg.data.content, 1, msg.data.username)
				}
				
			}
			this.ws.onopen = function(){
				this.send(JSON.stringify($this.user))
			}
		},

		wsSendMsg(){
			var text = this.container.find('#sendText').val()
			this.user.content = text
			this.ws.send(JSON.stringify(this.user))
			this.container.find('#sendText').val('')
		},

		createMsgListDOM(msg, num, username){
			var n = $('#msgList').children().length;
			$('#msgList').append(`
				<tr>
					<td>${n+1}</td>
					<td>${username}</td>
					<td>${msg}</td>
					<td>${num}</td>
					<td>
						<a class="btn btn-primary" data-toggle="modal" data-target="#CSpage-model">回复</a>
					</td>
				</tr>
			`)
		}
	}

	return CSpage
})
