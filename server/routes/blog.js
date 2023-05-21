const express = require("express")
const router = express.Router()
const {create,getAllBlogs,singleBlog,remove,update} = require("../controllers/blogController")
const {requireLogin} = require("../controllers/authController")

//ระบุเส้นทาง 
//เขียนบทความ

router.post('/create',requireLogin,create)

//ดึงข้อมูล
router.get('/blogs',getAllBlogs)

router.get('/blog/:slug',singleBlog)

//ลบข้อมูลบน server
router.delete('/blog/:slug',requireLogin,remove)

//update ข้อมูล
router.put('/blog/:slug',requireLogin,update)

module.exports = router