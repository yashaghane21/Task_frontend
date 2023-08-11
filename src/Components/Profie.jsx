import React, { useEffect, useState } from 'react'
import img from './user.png'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const [user, setuser] = useState("")
    //     const pid =useParams();
    //     console.log(pid)
    const navigate = useNavigate()
    const id = localStorage.getItem("userid")
    const getdata = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v3/userprofile/${id}`);
        console.log(data)
        setuser(data.user)
    }
    useEffect(() => {
        getdata();
    }, [])
    return (
        <div className=" flex justify-center items-center w-screen ">
            <div className='flex justify-center items-center '>
                <div className='p-5 w-[90%]  '>

                    <h1 className='font-semibold text-lg text-center pb-2'>{user.name} Account</h1>
                    <hr className='w-[100%] mt-1'></hr>
                    <div className='h-[30vh] sm:bg-white w-[90%] sm:w-[80%]'>

                        <h1 className='mt-5 text-center sm:text-left font-semibold'>Profile Photo</h1>
                        <div className='flex justify-center sm:justify-start'>
                            <img src={img} alt='dd' className='h-[14vh] mt-9 ' />

                        </div>


                    </div>
                    <hr className='w-screen  mt-1'></hr>
                    <div className='h-[12vh]'>
                        <h1 className='mt-2 font-semibold pl-2 sm:text-md'>Name</h1>
                        <h1 className='mt-2 mb-2 text-sm pl-2 '>{user.name}</h1>

                    </div>

                    <hr></hr>
                    <div className='h-[12vh]'>
                        <h1 className='mt-2 font-semibold pl-2'>Email address</h1>
                        <h1 className='mt-2 mb-2 text-sm pl-2'>{user.email}</h1>
                    </div>

                    <hr></hr>
                    <div className='h-[12vh]'>
                        <h1 className='mt-2 font-semibold pl-2'>Mobile Number</h1>
                        <h1 className='mt-2 mb-2 text-sm pl-2'>{user.phone}</h1>
                    </div>

                    <hr></hr>

                    <hr></hr>
                    <button onClick={() => navigate("/uprofile")} className='px-2 bg-red-700 rounded-md text=-white'>Update</button>
                </div>
            </div>

        </div>
    )
}

export default Profile
