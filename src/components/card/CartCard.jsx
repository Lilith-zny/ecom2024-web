import React from 'react'
import { X, Minus, Plus } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number';

const CartCard = () => {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    console.log(carts)
    
  return (
    <div>
        <h1 className='text-2xl font-bold'>Cart</h1>
        {/* Border */}
        <div className='border p-2'>
            {/* Card */}
            {
                carts.map((item, index) =>
                    <div key={index} className='bg-white p-2 shadow-md rounded-md mb-2'>
                        {/* Row 1 */}
                        <div className='flex justify-between mb-2'>
                            {/* Left */}
                            <div className='flex gap-2 items-center'>
                                {
                                    item.images && item.images.length > 0
                                    ? <img className='w-16 h-16 rounded-md' src={item.images[0].url} />
                                    : <div className='w-16 h-16 bg-gray-100 rounded-md flex items-center text-center'>No Image</div>
                                }
                                <div>
                                    <p className='font-bold'>{item.title}</p>
                                    <p className='text-sm'>{item.description}</p>
                                </div>
                            </div>
                            {/* Right */}
                            <div onClick={() => actionRemoveProduct(item.id)} className='text-red-500 p-2 hover:text-black cursor-pointer'>
                                <X />
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className='flex justify-between'>
                            {/* Left */}
                            <div className='border rounded-sm px-0.5 py-0.5 flex items-center'>
                                <button onClick={() => actionUpdateQuantity(item.id, item.count - 1)} className='bg-gray-100 px-2 py-0.5 hover:bg-gray-200 rounded-sm'><Minus size={18} /></button>
                                <span className='px-2'>{item.count}</span>
                                <button onClick={() => actionUpdateQuantity(item.id, item.count + 1)} className='bg-gray-100 px-2 py-0.5 hover:bg-gray-200 rounded-sm'><Plus size={18} /></button>
                            </div>
                            {/* Right */}
                            <div className='font-bold text-blue-500'>
                                { numberFormat(item.price * item.count)}
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Total */}
            <div className='flex justify-between px-2 pt-0.5'>
                <span>Total</span>
                <span>{ numberFormat(getTotalPrice())}</span>
            </div>
            {/* Button */}
            <Link to='/cart' >
                <button className='mt-4 bg-green-400 text-white w-full py-2 rounded-md shadow-md hover:bg-green-500'>Make Payment</button>
            </Link>
        </div>
    </div>
  )
}

export default CartCard