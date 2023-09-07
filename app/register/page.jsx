import RegisterForm from '@/components/registerForm/RegisterForm'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

const register =async () => {
  const session = await getServerSession(authOptions) 
  if(session){
    redirect("/dashboard")
  }
  return (
    <RegisterForm/>
  )
}

export default register