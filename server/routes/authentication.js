const express = require("express")
const { login } = require("../controllers/authController")
const router = express.Router()

//ส่ง req มาเพื่อยืนยันตัวตน admin
router.post('/login',login)

module.exports = router