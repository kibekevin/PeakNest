import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-1' src={currentUser.avatar} alt="avatar" />
                <input type="username" placeholder='username' id='username' className='border p-3 rounded-lg' />
                <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
                <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' />
                <button className='bg-slate-700 text-white uppercase rounded-lg hover:opacity-90 disabled:opacity-80 p-2 cursor-pointer'>update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
    </div>
  )
}

export default Profile
