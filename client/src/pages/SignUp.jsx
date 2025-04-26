import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            console.log(data);
            navigate('/sign-in');

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
        
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7 py-2'>SignUp</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" placeholder='username' id='username'className='border p-3 rounded-lg bg-white' onChange={handleChange}/>
            <input type="email" placeholder='email' id='email'className='border p-3 
            rounded-lg bg-white' onChange={handleChange}/>
            <input type="password" placeholder='password' id='password'className='border p-3 rounded-lg bg-white' onChange={handleChange}/>
            <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase 
            hover:opacity-90 cursor-pointer disabled:opacity-80'>
                {loading ? 'Loading...' : 'Sign Up'}
            </button>
        </form>
        <div className='flex gap-2 mt-3'>
            <p>Have an Account?</p>
            <Link to={"/sign-in"}>
                <span className='text-blue-700'>Sign in</span>
            </Link>
        </div>
        <div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    </div>
  )
}

export default SignUp
