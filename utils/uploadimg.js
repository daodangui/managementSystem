const multer = require('multer');
const mime = require('mime');
//nodejs自带的模块，无需安装
const crypto = require("crypto");

const storage = multer.diskStorage({
	destination: function(req,file,cb){
		//会在public之下建立upload文件夹来存放图片文件
		cb(null,'./public/upload')
	},
	//重命名文件
	filename: function(req,file,cb){
		crypto.pseudoRandomBytes(16,function(err,raw){
			cb(null,raw.toString('hex') + new Date().getTime() + '.' + mime.extension(file.mimetype))
		})
	}
})

module.exports = multer({storage})
