import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({message: 'Invalid email!'}),
  password: z.string().min(8, { message: 'Password ต้องมากกว่า 8 ตัวอักษร'}),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {message: 'Password ไม่ตรงกัน', path: ["confirmPassword"]})

const Register = () => {

  const [passwordScore, setPasswordScore] = useState(0)
  
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

    const validatePassword = () => {
      let password = watch().password
      return zxcvbn(password ? password : '').score
    }

    useEffect(() => {
      setPasswordScore(validatePassword())
    }, [watch().password])

    // console.log(passwordScore)

    // const handleOnChange = (e) => {
    //     // console.log(e.target.name, e.target.value)
    //     setForm({
    //         ...form,
    //         [e.target.name]:e.target.value
    //     })
    // }

    // const hdlSubmit = async (e) => {
    //     e.preventDefault()
    //     if(form.password != form.confirmPassword){
    //         return alert('Confirm Password is not Match')
    //     }
    //     console.log(form)
    //     // send to back
    //     try{
    //         const res = await axios.post('https://ecom2024-api-one.vercel.app/api/register', form)
    //         toast.success(res.data)
    //         console.log(res)
    //     }catch(err){
    //         const errMsg = err.response?.data?.message
    //         toast.error(errMsg)
    //         console.log(err)
    //     }
    // }

    const onSubmit = async (data) => {
      // const passwordScore = zxcvbn(data.password).score
      // if(passwordScore < 2){
      //   toast.warning(`Password is not Strong!`)
      //   return
      // }
      // console.log('ok')
      // send to back
      try{
        const res = await axios.post('https://ecom2024-api-one.vercel.app/api/register', data)
        toast.success(res.data)
        console.log(res)
      }catch(err){
          const errMsg = err.response?.data?.message
          toast.error(errMsg)
          console.log(err)
      }
      
    }


    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      <div className="w-full shadow-md bg-white p-8 max-w-md">
      <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
      
      
      
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">

              <div>
                <input {...register("email")} className={`border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.email && 'border-red-500'}`} placeholder="Email" />

                {
                  errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>
                }
              </div>



              <div>

                <input {...register("password")} type="password" className={`border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.password && 'border-red-500'}`} placeholder="Password" />

                {
                  errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>
                }

                {
                  watch().password?.length > 0 &&
                  <div className="flex mt-2">
                    {
                      Array.from(Array(5).keys()).map((item, index) =>
                        <span className="w-1/5 px-1" key={index}>
                          <div className={`rounded-md h-2 ${ passwordScore <= 2 
                            ? 'bg-red-500'
                            : passwordScore < 4
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                            }`}></div>
                        </span>
                      )
                    }
                  </div>
                }

              </div>

              <div>
                <input {...register("confirmPassword")} type="password" className={`border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.confirmPassword && 'border-red-500'}`} placeholder="Confirm Password" />

                {
                  errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                }

              </div>
            <button className="bg-blue-500 rounded-md w-full text-white py-1 font-bold shadow-md hover:bg-blue-700">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
