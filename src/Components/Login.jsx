import React from 'react'
import { useState } from 'react'
import img from "./login.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast } from "react-toastify"
import { useAuth } from './auth'
const Login = () => {
  const[auth,setauth]=useAuth()
  const navigate=useNavigate()
  const [email, setemail] = useState("")
  const [Password, setpassword] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(" http://localhost:5000/api/v1/login", {
        email: email,
        password: Password
      })
 console.log(data)
      if (data.success) {
        toast.success(" login succesfully ", {
          autoClose: 2000,
        });
        navigate("/")
        setauth({
          ...auth,
          user: data.user,
          token: data.token
        });
        localStorage.setItem("userid", data?.user._id)
        localStorage.setItem("auth", JSON.stringify(data));
      }
      else {
        toast.warn("check email or password")
      }


    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.warn(error.response.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error("An error occurred:", error.message);
      }
    }
  }
  return (
    <div className='flex h-screen'>
      <div className='hidden sm:flex justify-center items-center bg-blue-800 w-1/2'>
        <img src={img} alt='ff' className='w-[40%] h-[40%]' />
      </div>
      <div className='flex flex-col w-[100%] sm:w-1/2 justify-center items-center'>
        <form className='w-full px-4' onSubmit={handlesubmit}>
          <h1 className='text-center text-2xl font-semibold'>Login</h1>
          <h1 className='font-bold '>Email:</h1>
          <input type='text' placeholder='Enter Email' className='w-full p-2 border-2 rounded-md ' value={email} onChange={(e) => setemail(e.target.value)} />
          <h1 className='my-2 font-bold'>Password</h1>
          <input type='text' placeholder='Enter Password ' className='w-full p-2 border-2 rounded-md ' value={Password} onChange={(e) => setpassword(e.target.value)} />

          <input type='submit' className='w-[100%] bg-blue-500 border-2 rounded-md  p-2 mt-6 text-white' />
          <h1 className='text-center mt-2 font-semibold'>Not Registered ? <Link to="/signup" className='text-blue-800'>Register Here</Link></h1>
        </form>
      </div>
    </div>
  )

}

export default Login;
