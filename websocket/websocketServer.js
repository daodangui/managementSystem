
function websocket(){
	
	var WebsocketServer = require('ws').Server;

	wss = new WebsocketServer({port:8088, host:'10.9.164.43'});

	var clientMap = new Object();

	var i = 0;

	wss.on('connection',function(client){
		client.name = ++i;
		clientMap[client.name] = client;
	
		//接受客户端的信息
		client.on('message',function(msg,client){
			for(var key in clientMap){
				clientMap[key].send(msg);
			}
		})
	
		//客户端关闭离开
		client.on('close',function(){
			delete clientMap[client.name];
		})
	})
}

module.exports = websocket;