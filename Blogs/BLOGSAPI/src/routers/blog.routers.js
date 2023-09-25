const express = require("express");
const router = express.Router();
const { Blogctrl } = require('../controllers/blogs.control')
const bloguploads=require('../middleware/blogs.middleware');
const { authantication, authorization } = require("../middleware/auth");
router.post("/create", authantication, bloguploads.single('image'), Blogctrl.createblog);
router.get('/myblogs', authantication, Blogctrl.getblog)
router.get('/allblog', authorization, Blogctrl.getallblog)
 router.patch('/update',authantication,bloguploads.single('image'),Blogctrl.updateblog)
router.delete('/delete/:id',authantication,Blogctrl.deleteblog)
module.exports=router