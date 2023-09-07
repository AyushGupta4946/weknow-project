"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");

  const router = useRouter()

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const res =await signIn('credentials',{
        email,
        password,
        redirect:false
      })

      if(res.error){
        setError("Invalid Credentials")
        return;
      }

      router.replace("dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='email' />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>
          <div>
            {error && (<span className="text-red-600 font-bold text-sm my-2 mx-2"> {error}</span>
            )}                </div>
          <Link href={"/register"} className="text-sm ">
            Do not have an account? <span className='underline'>Register</span>
          </Link>
        </form>

      </div>
    </div>
  )
}

export default LoginForm