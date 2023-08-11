import React, { useEffect, useState } from 'react'
import img from "../assets/react.svg"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from './auth'
const Details = () => {
    const [dproduct, setproduct] = useState("")
    const id = useParams()
    const [auth, setauth] = useAuth()
    const uid = localStorage.getItem("userid")
    const navigate=useNavigate();
    const [quantity, setquantity] = useState("")
    console.log(uid)
    const addcart = async () => {
        const { data } = await axios.post("http://localhost:5000/api/v4/add-to-cart", {
            userId: uid,
            productId: id.id,
            quantity: quantity
        });
        if (data?.success) {
           
            toast.success("item added to cart")
           
        }
    }
    console.log(id)
    const product = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v2/product/${id.id}`)
        console.log(data)
        setproduct(data.product)
    }
    useEffect(() => {
        if (auth.user) {
            product()
        }
          else{
            toast.warn("login first")
            navigate("/")
          }
    }, [])
    return (
        <div className='flex flex-col sm:flex-row'>
            <div className='w-full sm:w-1/2 h-full  flex justify-center items-center'>
                <img src={dproduct.img} alt='f' className='w-full sm:w-1/2 p-5 h-[50vh]' />
            </div>
            <div className='mt-5  flex justify-center items-center'>
                <div className=''>
                    <h1 className='font-semibold'>{dproduct?.name}</h1>
                    <h1 className='mt-2 font-semibold'>₹{dproduct.price}</h1>
                    <p className=''>{dproduct.desc}</p>
                    <input type='number' placeholder='Quantity' value={quantity} onChange={(e) => setquantity(e.target.value)} className='border-2 mt-2 border-green-700 rounded-md' />
                    <button onClick={addcart} className='flex bg-blue-700 text-white  mt-2 px-2 rounded-md  cursor-pointer'>ADD TO CART</button>
                </div>

            </div>
        </div>
    )
}

export default Details
