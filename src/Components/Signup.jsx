import React, { useEffect, useState } from 'react'
import axios from "axios"
import img from "./login.png"
import {toast} from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [Password, setpassword] = useState("")
  const [phone, setphone] = useState("")



  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/register", {
        name: name,
        email: email,
        password: Password,
        phone: phone,
      });
      if (data.success) {
        toast.success("Registration Successfully ! ", {
          autoClose: 2000,

        })
        navigate("/login")
      }
      else {
        toast.warn("user already exist", {
          autoClose: 2000,
        })
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
          <h1 className='text-center text-2xl font-semibold'>Signup</h1>
          <input type='text' placeholder='Name ' className='w-full p-2 border-2 my-2 rounded-md '
            value={name} onChange={(e) => setname(e.target.value)} />
          <input type='email' placeholder='Enter Email' className='w-full p-2 border-2  my-2 rounded-md '
            value={email} onChange={(e) => setemail(e.target.value)} />
          <input type='text' placeholder='Enter Password ' className='w-full p-2 border-2 my-2 rounded-md '
            value={Password} onChange={(e) => setpassword(e.target.value)} />
         
          <input type='text' placeholder='Enter Phone ' className='w-full p-2 border-2 rounded-md '
            value={phone} onChange={(e) => setphone(e.target.value)} />
        

          <input type='submit' className='w-[100%] bg-blue-500 border-2 rounded-md  p-2 mt-6 text-white' />
          <h1 className='text-center mt-2 font-semibold'>Already Registered ? <Link to="/login" className='text-blue-800'>Sign in Here</Link></h1>
        </form>
      </div>
    </div>
  )


}

export default Signup
