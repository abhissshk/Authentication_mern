const cloudinary = require('cloudinary').v2;
const fs=require("fs")

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnClouinary=async (filepath)=>{
    try{
        if(!filepath){
            return null
        }
        let result=await cloudinary.uploader.upload(filepath)
        console.log(result)
        fs.unlinkSync(filepath)
        return result.secure_url
    }catch(err){
     fs.unlinkSync(filepath)
     console.log(err)
    }
}

module.exports=uploadOnClouinary
