import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Cart = () => {
    const userId = localStorage.getItem("userid");
    const [cart, setCart] = useState([]);

    const viewCart = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v4/cartlist/${userId}`);
            console.log(data);
            setCart(data.cart.products);
        } catch (error) {
            console.error("Error fetching cart data:", error);
            setCart([]);
        }
    };


    const cdelete = async (pid) => {
        try {
            const { data } = await axios.put("http://localhost:5000/api/v4/remove-from-cart", {
                userId: userId,
                productId: pid
            });
            console.log(pid);
            if (data?.success) {
                toast.success("item removed")
                viewCart();
            }
        } catch (error) {
            console.error("Error deleting item from cart:", error);
        }
    };

    useEffect(() => {
        viewCart();
    }, []);

    return (
        <div>
            <div className='flex justify-center sm:justify-start p-5'>
                <div className='grid grid-cols-1  min-[900px] sm:grid-cols-3 xl:grid-cols-4 overflow-hidden h-auto mt-3 sm:gap-[70px] md:gap-[70px] pb-[200px]'>
                    {cart.map((item) => (
                        <div className='h-[45vh] shadow-md w-[25vh] rounded-lg hover:border-2' key={item?._id}>
                            <div className='flex justify-end p-2'>
                                <button onClick={() => cdelete(item.product._id)} className='bg-red-500 px-2 rounded-md text-white'>Delete</button>

                            </div>
                            <img src={item?.product?.img} alt={item?.product?.name} className='h-[150px] w-full rounded-3xl p-5' />
                            <p className='pl-5 font-bold text-xl text-yellow-600'>{item?.product?.name}</p>
                            <p className='pl-5 font-bold'>₹{item?.product?.price} </p>
                            <p className='pl-5 font-bold font-mono'>{item?.product?.desc} </p>
                            <p className='pl-5 font-bold font-mono'>Quantity:-{item?.quantity}
                            </p>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
