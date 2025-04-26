import React from 'react'
import {Link} from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7 py-2'>SignUp</h1>
        <form className='flex flex-col gap-4'>
            <input type="text" placeholder='username' id='username'className='border p-3 rounded-lg bg-white' />
            <input type="email" placeholder='email' id='email'className='border p-3 
            rounded-lg bg-white' />
            <input type="password" placeholder='password' id='password'className='border p-3 rounded-lg bg-white' />
            <button className='bg-slate-700 text-white rounded-lg p-3 uppercase 
            hover:opacity-90 cursor-pointer disabled:opacity-80'>Sign Up</button>
        </form>
        <div className='flex gap-2 mt-3'>
            <p>Have an Account?</p>
            <Link to={"/sign-in"}>
                <span className='text-blue-700'>Sign in</span>
            </Link>
        </div>
    </div>
  )
}

export default SignUp
