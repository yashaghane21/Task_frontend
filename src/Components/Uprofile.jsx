import React, { useEffect, useState } from 'react'
import img from './user.png'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Uprofile = () => {
    const [user, setuser] = useState("")
    //     const pid =useParams();
    //     console.log(pid)
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [Password, setpassword] = useState("")
    const [phone, setphone] = useState("")


    const id = localStorage.getItem("userid")
    const getdata = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v3/userprofile/${id}`);
        console.log(data);
        setuser(data.user);
        setname(data.user.name);
        setemail(data.user.email);
        setphone(data.user.phone);
    };

    useEffect(() => {
        getdata();
    }, [])

    const updateprofile = async () => {
        const { data } = await axios.put(`http://localhost:5000/api/v3/update-profile/${id}`, {
            name: name,
            email: email,
            password: Password,
            phone: phone,
        })
        if (data.success) {
            toast.success("profile  updated succesfully ")
            navigate("/profile")
        }
    }
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
                        <input type=' text' value={name} onChange={(e) => setname(e.target.value)} border-2 border-black />

                    </div>

                    <hr></hr>
                    <div className='h-[12vh]'>
                        <h1 className='mt-2 font-semibold pl-2'>Email address</h1>
                        <input type=' text' value={email} onChange={(e) => setemail(e.target.value)}
                            defaultValue={user.email} border-2 border-black />
                    </div>

                    <hr></hr>
                    <div className='h-[12vh]'>
                        <h1 className='mt-2 font-semibold pl-2'>Mobile Number</h1>
                        <input type=' text' value={phone} onChange={(e) => setphone(e.target.value)} defaultValue={user.phone} border-2 border-black />
                    </div>

                    <hr></hr>

                    <hr></hr>
                    <button onClick={updateprofile} className='px-2 bg-red-700 rounded-md text=-white'>save</button>
                </div>
            </div>

        </div>
    )
}

export default Uprofile
