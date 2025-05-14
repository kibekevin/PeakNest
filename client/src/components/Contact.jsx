import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Contact = ({ listing }) => {

    const [seller, setSeller] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        try {
            const fetchSeller = async () => {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                }
                setSeller(data);
            }
            fetchSeller();
        } catch (error) {
            console.log(error);
        }
    }, [listing.userRef]);


    return (
        seller && (
            <div className='my-5 max-w-[760px]'>
                <p>Contact <span className='font-semibold'>{seller.username}</span> for <span className='font-semibold'>{listing.title.toLowerCase()}</span></p>
                <textarea name="message" id="message" rows={2} className='w-full my-3 border-2 border-gray-300 rounded-md p-2' placeholder='Enter your message here...' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <Link to={`mailto:${seller.email}?subject=Regarding ${listing.title}&body=${message}`} className='bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-fit hover:bg-slate-800 mt-6 mb-10 cursor-pointer'>Send Message</Link>
            </div>
        )
    )
}

export default Contact;