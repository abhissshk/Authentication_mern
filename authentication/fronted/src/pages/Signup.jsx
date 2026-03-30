import React, { useContext, useRef, useState } from 'react'
import dp from "../assets/profile.webp"
import { dataContext } from '../context/UserContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Signup() {
  let { serverUrl,userData,setUserData, getUserdata } = useContext(dataContext)
  let navigate = useNavigate()
  let file = useRef(null)

  let [firstName, setFirstName] = useState("")
  let [lastName, setlastName] = useState("")
  let [userName, setUserName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  let [frontendImage, setFrontedImage] = useState(dp)
  let [backendImage, setBackendImage] = useState(null)

  function handleImage(e) {
    let file = e.target.files[0]
    setBackendImage(file)

    let image = URL.createObjectURL(file)
    setFrontedImage(image)
  }

  const handlesignup = async (e) => {
    e.preventDefault()

    try {
      let formdata=new FormData();
    formdata.append("firstName",  firstName )
    formdata.append("lastName",lastName)
formdata.append("userName",userName)
formdata.append("email",email)
formdata.append("password",password)
if(backendImage){
  formdata.append("profileImage",backendImage)
}



      let {data} = await axios.post(
        serverUrl + "/api/signup",formdata,
        
        { withCredentials: true,
          headers:{"Content-Type":"multipart/form-data"}
         }
      )
      await getUserdata()
      setUserData(data)
 if(userData){
       navigate("/")
 }

      console.log(data)
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px]'>
          <h1 className='text-white text-[20px] font-semibold'>Sign up</h1>

          <form
            onSubmit={handlesignup}
            className='w-[100%] flex flex-col items-center justify-center gap-[20px]'
          >
            <input
              type="file"
              hidden
              ref={file}
              onChange={handleImage}
            />

            <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
              <img
                src={frontendImage}
                className='w-[100%] h-[100%]'
                alt=""
              />

              <div
                onClick={() => file.current.click()}
                className='absolute w-[100%] h-[100%] top-0 bg-black opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-[20px] font-semibold'
              >
                +
              </div>
            </div>

            <div className='w-[80%] h-[50px] flex justify-center items-center gap-[10px]'>
              <input
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-[50%] h-[50px] bg-white rounded-lg px-[10px]'
              />

              <input
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className='w-[50%] h-[50px] bg-white rounded-lg px-[10px]'
              />
            </div>

            <input
              type="text"
              placeholder='username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='w-[80%] h-[50px] bg-white rounded-lg px-[10px]'
            />

            <input
              type="email"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-[80%] h-[50px] bg-white rounded-lg px-[10px]'
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              className='w-[80%] h-[50px] bg-white rounded-lg px-[10px]'
            />

            <button
              type="submit"
              className='bg-sky-400 text-black px-[10px] py-[5px] rounded-lg'
            >
              Sign Up
            </button>

            <p
              className='text-white cursor-pointer mb-10'
              onClick={() => navigate('/login')}
            >
              Already have an account ?
              <span className='text-sky-500'> Login</span>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup