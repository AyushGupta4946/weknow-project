"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!name || !email || !password){
        setError("All feilds are required")
    }

    try {

        const resUserExists = await fetch("api/userExists",{
            method:"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        });

        const {user} = await resUserExists.json()
        if(user){
            setError("User already exists")
            return;
        }

        const res = await fetch('api/register',{
            method:"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        })
        if(res.ok){
            const form = e.target;
            form.reset();
            router.push("/")
        }else{
            console.log("user registration failed")
        }
    } catch (error) {
        console.log("error during registration", error)
    }

  }


  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Full name" />
          <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="email" />
          <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="password" />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          <div>
            {error && (
              <span className="text-red-600 font-bold text-sm my-2 mx-2">
                {error}
              </span>
            )}{" "}
          </div>
          <Link href={"/"} className="text-sm ">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
