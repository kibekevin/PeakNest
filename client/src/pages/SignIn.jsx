import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {

    const [formData, setFormData] = useState({});
    //const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            dispatch(signInStart());
            setLoading(true);
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            setLoading(false);
            if (!data) {
                dispatch(signInFailure('No data received from server'));
                return;
            }

            if (data.success === false) {
                dispatch(signInFailure(data.message || 'Sign in failed'));
                return;
            }

            // if (!data.user) {
            //     dispatch(signInFailure('Invalid user data received'));
            //     console.log(data);
            //     return;
            // }

            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            setError(error.message || 'An error occurred during sign in');
            dispatch(signInFailure(error.message || 'An error occurred during sign in'));
            setLoading(false);
            return;
        }
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7 py-2'>SignIn</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="email" placeholder='email' id='email'className='border p-3 
            rounded-lg bg-white' onChange={handleChange}/>
            <input type="password" placeholder='password' id='password'className='border p-3 rounded-lg bg-white' onChange={handleChange}/>
            <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase 
            hover:opacity-90 cursor-pointer disabled:opacity-80'>
                {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth/>
        </form>
        <div className='flex gap-2 mt-3'>
            <p>Dont have an Account?</p>
            <Link to={"/sign-up"}>
                <span className='text-blue-700'>Sign up</span>
            </Link>
        </div>
        <div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    </div>
  )
}

export default SignIn

