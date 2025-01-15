import React, { useState, useEffect } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCard = () => {
    const token = useEcomStore((state) => state.token)

    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setAddress] = useState('')    
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        handleGetUserCart(token)
    }, [])
    const handleGetUserCart = (token) => {
        listUserCart(token)
        .then((res) => {
            setProducts(res.data.product)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSaveAddress = () => {
        console.log(address)
        if(!address){
            return toast.warning('Please fill address')
        }
        saveAddress(token, address)
        .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setAddressSaved(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleGoToPayment = () => {
        if(!addressSaved){
            return toast.warning(`กรุณากรอดที่อยู่ก่อน`)
        }
        navigate('/user/payment')
    }

    // console.log(products)

  return (
    <div className='mx-auto'>
        <div className='flex flex-warp gap-4'>
            {/* LEFT */}
            <div className='w-2/4'>
                <div className='bg-white p-4 rounded-md border shadow-md space-y-2'>
                    <h1 className='text-lg font-bold'>ที่อยู่ในการจัดส่ง</h1>
                    <textarea onChange={(e) => setAddress(e.target.value)} className='w-full px-2 border rounded-md' placeholder='กรุุณากรอกที่อยู่' required />
                    <button onClick={handleSaveAddress} className='bg-blue-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 hover:duration-100'>Save Address</button>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-2/4'>
                <div className='bg-white p-4 rounded-md border shadow-md space-y-4'>
                    <h1 className='text-lg'>Your Order</h1>
                    {/* Item List */}
                    {
                        products?.map((item, i) =>
                            <div key={i}>
                                <div className='flex justify-between items-end'>
                                    {/* LEFT */}
                                    <div>
                                        <p className='font-bold'>{item.product.title}</p>
                                        <p className='text-sm text-gray-500'>Quantity: {item.count} x {numberFormat(item.product.price)}</p>
                                    </div>
                                    {/* RIGHT */}
                                    <div>
                                        <p className='text-red-500 font-bold'>{numberFormat(item.count * item.product.price)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                    {/* COST */}
                    <div>
                        <div className='flex justify-between'>
                            <p>ค่าจัดส่ง:</p>
                            <p>0.00</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>ส่วนลด:</p>
                            <p>0.00</p>
                        </div>
                    </div>
                    {/* TOTAL */}
                    <hr />
                    <div>
                        <div className='flex justify-between'>
                            <p className='font-bold'>ยอดรวมสุทธิ:</p>
                            <p className='text-red-500 font-bold text-lg'>{numberFormat(cartTotal)}</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <button onClick={handleGoToPayment} className='bg-green-500 p-2 w-full rounded-md text-white shadow-md hover:bg-green-600'>ดำเนินการชำระเงิน</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SummaryCard