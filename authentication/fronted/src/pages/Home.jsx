import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'

export default function Home() {
  let { serverUrl, userData, setUserData} = useContext(dataContext)

  const handleLogout=async()=>{
try{
let data=await axios.post(serverUrl + "/api/logout",{},{
    withCredentials:true
})
setUserData(null)
}catch(err){
console.log(err)
}
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-900 via-black gap-6 to-purple-900'>

<div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
              <img
                src={userData.profileImage}
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

        <p className='text-white text-2xl md:text-3xl mb-6 text-center'>
          Hey, <span className='text-pink-400 font-semibold'>{userData.firstName}</span> 👋 <br />
          Welcome to website Have nice day
        </p>

        <button onClick={handleLogout} className='bg-sky-400 cursor-pointer hover:bg-sky-500 text-black px-6 py-2 rounded-xl font-semibold transition duration-300 shadow-lg hover:bg-amber-500'>
          Logout
        </button>

      </div>
    </>
  )
}