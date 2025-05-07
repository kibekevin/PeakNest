import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UploadWidget from '../components/uploadWidget/uploadWidget.jsx';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

const Profile = () => {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(currentUser.avatar);
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const dispatch = useDispatch();



    const handleSubmit = async(e) => {
        e.preventDefault(); // prevent page reload

        const updatedFormData = { avatar, username, email, password };
        
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            })

            const data = await res.json();
            console.log(data);

            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);

        } catch (error) {
            dispatch(updateUserFailure(error.message))
            console.log(error)
        }
    };

    

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-1' src={avatar} alt="avatar" />
                
                <UploadWidget uwConfig={{
                    cloudName : "dnfnbnmwr",
                    uploadPreset: "peaknest",
                    multiple: false,
                    maxImageFileSize: 3000000,
                    folder: "avatars"
                    }}
                    setAvatar={setAvatar}
                />

                <input type="text" name="username"   className='border p-3 rounded-lg' value={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
                <input type="email" name='email'  className='border p-3 rounded-lg' value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button disabled={loading} type='submit' className='bg-slate-700 text-white uppercase rounded-lg hover:opacity-90 disabled:opacity-80 p-2 cursor-pointer'>{loading ? "Loading..." : "Update"}</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
            {error && <span className='text-red-700'>{error}</span>}
            {updateSuccess && <span className='text-green-700'>Profile updated successfully</span>}
    </div>
  )
}

export default Profile
