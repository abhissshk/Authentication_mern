import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from "axios"
import dp from "../assets/profile.webp"
import { useNavigate } from 'react-router-dom'

function Login() {
  let { serverUrl,userData,setUserData, getUserdata } = useContext(dataContext)

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
    let navigate=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
       await axios.post(
        serverUrl + "/api/login",
        {
          email,
          password
        },
        { withCredentials: true }
      )
          await getUserdata()
  navigate("/")
   
} catch (err) {
    console.log(err.response?.data?.message)
    alert(err.response?.data?.message)
  }
  }

  return (
    <>
      <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[500px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px]'>
          <h1 className='text-white text-[20px] font-semibold'>Login</h1>

          <form
            onSubmit={handleLogin}
            className='w-[100%] flex flex-col items-center justify-center gap-[20px]'
          >
            <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
              <img src={dp} className='w-[100%] h-[100%]' alt="" />
            </div>

            <input
              type="email"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            />

            <button
              type="submit"
              className='bg-sky-400 text-black px-[10px] py-[5px] rounded-lg'
            >
              Login
            </button>


            <p className='text-white cursor-pointer mb-10' onClick={()=>navigate('/signup')}> Want to Create new account ?<span className='text-sky-500'>Login</span></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login