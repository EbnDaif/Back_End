const multer = require("multer");
const path = require('path')
 const blogstorage =multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        ext = path.extname(file.originalname)
        cb(null, Date.now()+ext)
    }
})
const bloguploads = multer({
    storage: blogstorage,
    limits:{fileSize:1024*1024*5}
})

module.exports=bloguploads