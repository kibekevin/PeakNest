import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UploadWidget from '../components/uploadWidget/uploadWidget.jsx';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutStart, signoutSuccess, signoutFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';    

const Profile = () => {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(currentUser.avatar);
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errorShowListings, setErrorShowListings] = useState(false);
    const [userListings, setUserListings] = useState([]);

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

    const handleDeleteUser = async() => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',
            })
            const data = await res.json();

            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            


            
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }


    // Signout
    const handleSignout = async() => {
        try {
            dispatch(signoutStart());
            const res = await fetch('/api/auth/signout', {
                method: 'GET',
            })
            const data = await res.json();
            if (data.success === false) {
                dispatch(signoutFailure(data.message));
                return;
            }
            dispatch(signoutSuccess(data));
            console.log(data);
        } catch (error) {
            dispatch(signoutFailure(error.message));
            
        }
    }

    const handleShowListings = async() => {
        try {
            setErrorShowListings(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`)
            const data = await res.json();
            if (data.success === false) {
                setErrorShowListings(true);
                return;
            }
            setUserListings(data);
        } catch (error) {
            setErrorShowListings(true);
        }
    }

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
                <Link to='/create-listing'>
                    <button className='bg-green-700 text-white uppercase text-center w-full rounded-lg hover:opacity-90 disabled:opacity-80 p-2 cursor-pointer'>Create Listing</button>
                </Link>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
            {error && <span className='text-red-700'>{error}</span>}
            {updateSuccess && <span className='text-green-700'>Profile updated successfully</span>}
            <button onClick={handleShowListings} className='text-blue-700 cursor-pointer mt-5 mb-5 w-full'>Show Listings</button>
            {errorShowListings && <span className='text-red-700'>Error showing listings</span>}
            {userListings && userListings.length > 0 && 
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-semibold text-center my-5'>Your Listings</h1>
            {userListings.map((listing) => (
                <div key={listing._id} className='border rounded-lg mb-5 hover:bg-slate-200'>
                    <Link to={`/update-listing/${listing._id}`}>
                        <div className='flex flex-row items-center gap-2 justify-between w-full p-2'>
                            <img src={listing.imageUrls[0]} alt="listing cover" className='h-18 w-24 object-cover rounded-lg'/>
                            <div className='flex justify-between items-center gap-5'>
                                <span className='font-semibold truncate'>{listing.title}</span>
                                <span className='text-sm text-gray-500 truncate'>${listing.regularPrice}</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <button className='text-red-700 cursor-pointer border border-red-700 p-1 rounded-lg hover:bg-red-700 hover:text-white'>Delete</button>
                                <button className='text-blue-700 cursor-pointer border border-blue-700 p-1 rounded-lg hover:bg-blue-700 hover:text-white'>Edit</button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            </div>
            }

    </div>
  )
}

export default Profile
