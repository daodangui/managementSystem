const querystring = require('querystring')

const WebSocket = require('ws')

var users = []
var wardens = []

function WsServer(){
 	const wss = new WebSocket.Server({port: 4444})
 	wss.on('connection', function(ws){
 		ws.on('message', function(message){
 			var message = JSON.parse(message)
 			ws.user = message
 			//对用户进行验证分类
 			pushUser(message.roles, ws)
 			//切换话务员通话的对象
 			switchTarget(ws, message)
 			//建立一对一连接关系后，发送数据
 			sendMsg(ws)
 			//当用户第一次连接时为用户分配话务员
 			firstCon(message, ws)
 		})

 		ws.on('close', function(){
 			if(users.indexOf(ws) >= 0){
 				ws.toname.userNum--
 				users.splice(users.indexOf(ws),1)
 			}else if(wardens.indexOf(ws) >= 0){
 				wardens.splice(wardens.indexOf(ws),1)
 			}
 		})
 	})
 }

//切换话务员通话的对象
function switchTarget(ws, message){
	if(wardens.includes(ws)){
		for(var i=0; i<users.length; i++){
			if(users[i].user.username == message.toname){
				ws.toname = users[i]
				break;
			}
		}
	}
}


 //发送数据
 function sendMsg(ws){
 	if(ws.toname){
		var data = {
			content: ws.user.content,
			username: ws.user.username
		}
		ws.toname.send(JSON.stringify(data))
	}
 }

//当用户第一次连接时为用户分配话务员
function firstCon(message, ws){
	if(!message.roles && !ws.toname){
		if(wardens.length > 0){
			var bwar = wardens[0]
			for(var i=0; i<wardens.length; i++){
				if(wardens[i].userNum < bwar.userNum){
					bwar = wardens[i]
				}
			}
			ws.toname = bwar
			// bwar.toname = ws  //花园的通话对象是可以由话务员自己调整的
			bwar.userNum++
			ws.send('话务员 ' + bwar.user.username + ' 为您服务')
			// wardens.forEach(function(value){
			// 	console.log(value.user.username+':'+value.userNum);
			// })
		}else{
			ws.send('当前线路繁忙，请稍后！')
		}
	}
}

 //用户分类
 function pushUser(roles, ws){
 	if(roles == 1){
		if(!wardens.includes(ws)){
			ws.userNum = 0
			wardens.push(ws)
			if(wardens.length == 1){
				users.forEach(function(value){
					value.toname = wardens[0]
					value.send('话务员 ' + wardens[0].user.username + ' 为您服务')
				})
			}
		}
	}else{
		if(!users.includes(ws)){
			users.push(ws)
		}
	}
 }

module.exports = WsServer