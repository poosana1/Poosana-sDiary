const jwt = require("jsonwebtoken")
const expressJWT =require("express-jwt")


exports.login=(req,res)=>{

    //ข้อมูล username,password
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        //เข้าสู่ระบบ
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'3d'})
        return res.json({token,username})
    }else{
        return res.status(400).json({
            error:"รหัสผ่านไม่ถูกต้อง"
        })
    }
}

// สร้าง middleware เพื่อตรวจสอบ token
exports.requireLogin = expressJWT({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})
