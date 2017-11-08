const multer = require('multer')
const mime = require('mime')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  //为文件重命名
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + new Date().getTime() + '.' + mime.getExtension(file.mimetype))
    })
  }
})

module.exports = multer({storage})
