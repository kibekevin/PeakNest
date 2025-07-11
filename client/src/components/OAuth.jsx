import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom'

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const results = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: results.user.displayName,
                    email: results.user.email,
                    photo: results.user.photoURL
                })
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
            
        } catch (error) {
            console.log('unable to sign in with google', error)
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 rounded-lg p-3 text-white cursor-pointer hover:opacity-80'>
      Continue with Google
    </button>
  )
}

export default OAuth
