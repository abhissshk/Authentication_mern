const mongoose=require("mongoose")
 async function connectdb(){
try{
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("mongodb is connect")

}catch(err){
    console.log("db err",err)
}

}

module.exports=connectdb