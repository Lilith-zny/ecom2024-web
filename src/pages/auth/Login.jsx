import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const actionLogin = useEcomStore((state) => state.actionLogin)
    const user = useEcomStore((state) => state.user)
    // console.log(`user form zustand`, user)

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleOnChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await actionLogin(form)
            const role = res.data.payload.role
            console.log('res', role)
            roleRedirect(role)
            toast.success(`Welcome Back`)
        }catch(err){
            console.log(err)
            const errMsg = err.response?.data?.message
            toast.error(errMsg)
        }
    }

    const roleRedirect = (role) => {
        if(role === 'admin'){
            navigate('/admin')
        }else{
            navigate(-1)
        }
    }

    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input onChange={handleOnChange} className="border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" name="email" placeholder="Email" />
            </div>
            <div>
              <input onChange={handleOnChange} className="border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="password" name="password" placeholder="Password" />
            </div>
            <button className="bg-blue-500 rounded-md w-full text-white py-1 font-bold shadow-md hover:bg-blue-700">Register</button>            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
