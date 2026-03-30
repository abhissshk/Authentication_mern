require("dotenv").config()
const express=require("express")
const connectdb = require("./configure/db")
const authRouter = require("./routes/auth.routes")
const app=express()
const port=process.env.PORT||4000
const cookieparser=require("cookie-parser")
const cors=require("cors")

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use("/api",authRouter)


app.listen(port,()=>{
    connectdb()
    console.log("server is running port no 4000")
})