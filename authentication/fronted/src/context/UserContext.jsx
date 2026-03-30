import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()

function UserContext({ children }) {
    let navigate=useNavigate()

  let [userData, setUserData] = useState(null)

  // const serverUrl = "http://localhost:4000"
const serverUrl = "https://authentication-mern-bjxg.onrender.com"

  const getUserdata = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/api/getuserdata", {
        withCredentials: true
      })
      setUserData(data)
    } catch (err) {
        navigate("/login")
      console.log(err.response?.data || err.message)
    }
  } 

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserdata  
  }

  useEffect(() => {
    getUserdata()
  }, [])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext