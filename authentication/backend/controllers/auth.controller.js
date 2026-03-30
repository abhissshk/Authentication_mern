const uploadOnClouinary = require("../configure/cloundiary");
const genrateToken = require("../configure/token");
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;

    if(!firstName || !lastName || !email || !password ||!userName){
        return res.status(400).json({
            message:"send all details"
        })
    }

// image on clodury
let profileImage;
if(req.file){
 profileImage=await uploadOnClouinary(req.file.path)
}
console.log(req.file);

    let existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ message: "User alreay exist" });
    }

    const hassedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password:hassedpassword,
      userName,
      profileImage
    });

   

  let token
try{
      token=genrateToken(user._id)
} catch(err) {
  console.log("JWT Error:", err);
  return res.status(500).json({message: "token generation failed"});
}
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

return res.status(201).json({user:{firstName, lastName, email,userName,profileImage},
message:"user created"
})

  } catch (err) {
    return res.status(500).json({ message: "internal server err", err });
  }
};


// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "user does not exist" });
    }

    let match = await bcrypt.compare(password, existUser.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    let token = genrateToken(existUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        userName: existUser.userName,
        profileImage: existUser.profileImage
      },
      message: "login successfully"
    });

  } catch (err) {
return res.status(500).json({message:err})
  }
};
const logout=async(req,res)=>{
  try{
res.clearCookie("token")
 return res.status(200).json({message:"Logout successfully"})
  }catch(err){
    return res.status(500).json(err)
  }

}

// user data

const getUserData=async(req,res)=>{
  try{
    let userId=req.userId
    if(!userId){
      return res.status(400).json({message:"user id is  not found"})
    }

let user=await User.findById(userId)
if(!user){
  return res.status(400).json({message:"user not found"})
}

    return res.status(200).json(user)
  }catch(err){
     console.log(err);
    return res.status(500).json({message:err})

  }
}

module.exports = { signup ,login,logout,getUserData};
