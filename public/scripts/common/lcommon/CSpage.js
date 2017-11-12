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
				content: ''
			}
			this.infoLists = {}
			this.createDom()
			this.toname = ''
		},

		createDom(){
			var html = new EJS({ url: '/template/ltemplate/Cspage.ejs'}).render({})
			this.container.html(html)
			this.webSocket()
			this.bindEvents()
		},

		bindEvents(){
			this.container.find('#sendMsg').on('click', this.wsSendMsg.bind(this))
			//点击打开模态窗口
			this.container.find('#msgList').on('click', '.btnRevert', this.clickRevert.bind(this))
		},

		clickRevert(e){
			this.toname = $(e.target).closest('tr').attr('data-user')
			this.xrInfoListbox(this.toname)
			$(e.target).closest('tr').find('.badge').text('0')
		},

		webSocket(){
			var $this = this
			this.ws = new WebSocket('ws://10.9.164.43:4000')
			this.ws.onmessage = function(msg){
				var data = JSON.parse(msg.data)
				var info = {
					data,
					roles: 'client'
				}
				if($this.infoLists[data.username]){
					$this.infoLists[data.username].push(info)
				}else{
					$this.infoLists[data.username] = [info]
				}
				var k = 0;
				$('#msgList').children().each(function(index, element){
					if($(element).children().eq(1).text() == data.username){
						k =1;
						$(element).children().eq(2).text(data.content)
						$(element).find('.badge').text(parseInt($(element).find('.badge').text()) + 1)
					}
				})
				if(k == 0){
					$this.createMsgListDOM(data.content, 1, data.username)
				}
				if($this.container.find('.CSpageUsername').text() == data.username){
					$this.xrInfoListbox(data.username)
					$this.container.find('#msgList').find('tr').each(function(index, value){
						if($(this).find('td').eq(1).text() == data.username){
							$(this).find('.badge').text('0')
						}
					})
				}
			}
			this.ws.onopen = function(){
				this.send(JSON.stringify($this.user))
			}
		},

		wsSendMsg(){
			var text = this.container.find('#sendText').val()
			this.user.content = text
			this.user.toname = this.toname
			this.ws.send(JSON.stringify(this.user))
			var info = {
				data: JSON.parse(JSON.stringify(this.user)),
				roles: 'my'
			}
			this.infoLists[this.toname].push(info)
			this.container.find('#sendText').val('')
			this.xrInfoListbox(this.toname)
		},

		xrInfoListbox(username){
			var html = ''
			this.infoLists[username].forEach(function(value, index){
				html += `<div class="msgbox ${value.roles == 'my'? 'msgLeft':'msgRight'}">
			                <p>${value.data.username}</p>
			                <p>${value.data.content}</p>
			            </div>`
			})
			this.container.find('.CSpageUsername').html(username)
			this.container.find('.showWordsBox').html(html)
			this.container.find('.showWordsBox>div:last-child').get(0).scrollIntoView(false)
		},

		createMsgListDOM(msg, num, username){
			var n = $('#msgList').children().length;
			$('#msgList').append(`
				<tr data-user="${username}">
					<td>${n+1}</td>
					<td>${username ? username:'匿名用户'}</td>
					<td>${msg}</td>
					<td>
					<button class="btn btn-danger" type="button"> 
					  未读 <span class="badge">${num}</span>
					</button>
					</td>
					<td>
						<a class="btn btn-primary btnRevert" data-toggle="modal" data-target="#CSpage-model">回复</a>
					</td>
				</tr>
			`)
		}
	}

	return CSpage
})
