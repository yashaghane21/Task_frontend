import React, { useState } from 'react';
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';


export default function Nav() {
    const [nav, setnav] = useState(false);
    const [auth, setauth] = useAuth();
    const navigate=useNavigate()
    const handle = () => {
        setnav(!nav);
    }

    return (
        <div className=''>
            <div className='flex justify-between items-center p-4 shadow-lg'>
                <section>
                    <h1 className='mx-2 font-bold text-md sm:text-2xl text-blue-700 cursor-pointer flex'>
                        <VscFeedback size={23} className='mr-2' />
                        E<span className='text-gray-500'>CART</span>
                    </h1>
                </section>
                <section onClick={handle} className='sm:hidden'>
                    {nav ? <GiCancel size={23} /> : <GiHamburgerMenu size={23} />}
                </section>

                <ul className='hidden md:flex items-center cursor-pointer'>
                    <li className='mx-2 font-bold' onClick={() => navigate("/")}>Home</li>
                    <li className='mx-2 font-bold'>Contact</li>
                    <li className='mx-2 font-bold'>About</li>
                    <li className='flex'>
                        {!auth.user ? (
                            <>
                                <button onClick={() => navigate("/signup")} className='bg-blue-700 rounded-md px-2 text-white'>Signup </button>
                                <button onClick={() => navigate("/login")} className='bg-blue-700 rounded-md px-2 text-white mx-2'>Login </button>
                            </>
                        ) : (
                            <>
                                <h1 onClick={()=>navigate("/profile")} className='font-bold'>  {auth.user.name}</h1>
                            </>
                        )}
                    </li>
                </ul>
            </div>

            <section className='sm:flex md:hidden'>
                <ul className={`bg-gray-300 flex flex-col absolute left-0 h-screen shadow-sm ${nav ? 'w-[50%] sm:w-17' : "w-0 overflow-hidden"} transition-all ease-linear duration-200`}>
                    <li className='mx-2 my-1 font-semibold hover:border-b-2 border-black inline' onClick={() => navigate("/")}>Home</li>
                    <li className='mx-2 my-1 font-semibold hover:border-b-2 border-black inline'>Contact</li>
                    <li className='mx-2 my-1 font-semibold hover:border-b-2 border-black inline'>About</li>
                    <li className='flex'>
                        {!auth.user ? (
                            <>
                                <button onClick={() => navigate("/signup")} className='bg-blue-700 rounded-md px-2 text-white'>Signup </button>
                                <button onClick={() => navigate("/login")} className='bg-blue-700 rounded-md px-2 text-white mx-2'>Login </button>
                            </>
                        ) : (
                            <>
                            <h1 onClick={()=>navigate("/profile")} className='font-bold'>  {auth.user.name}</h1>
                              
                            </>
                        )}
                    </li>
                </ul>
            </section>
        </div>
    )
}
