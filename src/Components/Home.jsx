import React, { useEffect, useState } from 'react'
import img from "../assets/react.svg"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [products,setproducts]=useState([])
    const navigate =useNavigate()
    const produ = async()=>{
        const {data}= await axios.get("http://localhost:5000/api/v2/all-products")
        console.log(data)
        setproducts(data.products)

    }
    useEffect(()=>{
        produ()
    },[])
    return (
        <div>
            <div className='flex justify-center p-5'>

                <div className='grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4 overflow-hidden h-auto  mt-3 sm:gap-[70px] md:gap-[70px] pb-[200px]    '>


                   {products.map((p)=>(
                     <div className='h-[300px]  shadow-md w-70 rounded-lg  hover:border-2  ' key={p._id} >
                     <img src={p.img} className='h-[150px] w-full rounded-3xl p-5' />
                     <p className='pl-5 font-bold text-xl text-yellow-600'>{p.name}</p>
                     <p className='pl-5 font-bold'>₹{p.price} </p>

                     <p className='pl-5 font-bold font-mono'>{p.desc}</p>
                     <div className='pl-[210px] pt-[15px]'>
                         <button onClick={()=>navigate(`/details/${p._id}`)} className=' rounded-sm pl-3 pr-3 pb-1 border-2 hover:border-black  text-blue-500 font-bold hover:border-1' >Next</button>
                     </div>



                 </div>
                   ))}
                   

                </div>
            </div>
        </div>
    )
}

export default Home
