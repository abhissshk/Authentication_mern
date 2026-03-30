const express=require("express")
const { signup, login, logout, getUserData } = require("../controllers/auth.controller")
const upload = require("../middleware/multer")

const checkAuth = require("../middleware/checAuth")

const authRouter=express.Router()



authRouter.post("/signup",upload.single("profileImage"),signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/getuserdata",checkAuth,getUserData)


module.exports=authRouter