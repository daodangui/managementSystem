const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession =require('cookie-session')

const apiRoute = require('./routes/api.js')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 使用服务器客户端数据通信的中间件
app.use(cookieSession({
  name: 'session',
  secret: 'this is a random words',
  maxAge: 1000 * 60 * 60 * 24
}))

app.use('/api', apiRoute)

//app.listen('5000', '10.9.164.43')
app.listen('5000', 'localhost')
