const querystring = require('querystring')

const WebSocket = require('ws')

var users = []
var wardens = []

function WsServer(){
 	const wss = new WebSocket.Server({port: 5000})
 	wss.on('connection', function(ws){
 		ws.on('message', function(message){
 			var message = JSON.parse(message)
 			ws.user = message
 			//对用户进行验证分类
 			pushUser(message.roles, ws)
 			//建立一对一连接关系后，发送数据
 			sendMsg(ws)
 			//当用户第一次连接时为用户分配话务员
 			firstCon(message, ws)
 		})

 		ws.on('close', function(){
 			if(users.indexOf(ws) >= 0){
 				ws.toname.userNum--
 				users.splice(users.indexOf(ws),1)
 			}
 		})
 	})
 }

 //发送数据
 function sendMsg(ws){
 	if(ws.toname){
		var data = {
			content: ws.user.content,
			username: ws.user.username
		}
		ws.toname.send(data)
	}
 }

//当用户第一次连接时为用户分配话务员
function firstCon(message, ws){
	if(!message.roles && !ws.toname){
		var bwar = wardens[0]
		for(var i=0; i<wardens.length; i++){
			if(wardens[i].user.userNum < bwar.user.userNum){
				bwar = wardens[i]
			}
		}
		ws.toname = bwar
		bwar.toname = ws
		bwar.userNum++
		ws.send('话务员 ' + bwar.user.username + ' 为您服务')
	}
}

 //用户分类
 function pushUser(roles, ws){
 	if(roles == 1){
		if(!wardens.includes(ws)){
			wardens.push(ws)
		}
	}else{
		if(!users.includes(ws)){
			users.push(ws)
		}
	}
 }

module.exports = WsServer