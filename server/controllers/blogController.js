//ติดต่อกับฐานข้อมูล /ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
//แก้ slug ภาษาไทย
const {v4: uuidv4} = require('uuid')

//บันทึกข้อมูล
exports.create = (req,res) => {

  const { title, content, author } = req.body
  let slug = slugify(title)

  if(!slug)slug = uuidv4();

  // validate /ตรวจสอบความถูกต้องข้อมูล
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Please fill article topic" })
      break;
    case !content:
      return res.status(400).json({ error: "Please fill article detail" })
      break;
  }

  //บันทึกข้อมูล
  Blogs.create({ title, content, author, slug })
    .then(blogSuccess => {
      res.json(blogSuccess);
    }).catch(err => {
      res.status(400).json({ error: "There are duplicated article names" });
    })
}
//ดึงข้อมูลบทความทั้งหมด
exports.getAllBlogs=(req,res)=>{
  Blogs.find({}).exec().then(blogs=>{
    res.json(blogs)
  }).catch(err=>{
    res.status(500)
  })
}

//ดึงบทความอ้างอิงตาม slug
exports.singleBlog=(req,res)=>{
  const {slug} = req.params
  Blogs.findOne({slug}).exec().then(blog=>{res.json(blog)})
}

//ลบข้อมูลบน server
exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec()
    .then(blog => {
      res.end();
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};


//แก้ไขข้อมูลบทความ
exports.update = (req, res) => {
  const { slug } = req.params;
  //ส่งข้อมูล title content author
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true })
    .exec()
    .then(blog => {
      res.json(blog);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};