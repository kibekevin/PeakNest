import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListingCard from '../components/ListingCard'

const Home = () => {
    const [recentListings, setRecentListings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentListings = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/listing/get?limit=3&order=desc&sort=createdAt');
                const data = await res.json();
                
                if (data.success === false) {
                    setError(data.message || 'Failed to fetch listings');
                    setRecentListings([]);
                    return;
                }

                if (!Array.isArray(data)) {
                    setError('Invalid data format received');
                    setRecentListings([]);
                    return;
                }

                setRecentListings(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
                setError('Failed to fetch listings');
                setRecentListings([]);
            } finally {
                setLoading(false);
            }
        }
        fetchRecentListings();
    }, []);

    return (
        <div className='p-2 sm:p-4 bg-slate-100'>
            <div className='max-w-6xl mx-auto mt-10 md:mt-20 lg:mt-20'>
                <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-8 lg:mb-12 text-slate-800'>
                    Find your next <span className='text-slate-500'>Perfect</span> <br/>
                    space with <span className='text-slate-500'>Ease</span>
                </h1>
                <div className='mb-4 md:mb-8 lg:mb-12 text-slate-600'>
                    <p>
                        PeakNest is the best place to find your next home.
                    </p>
                    <p>
                        Peak for the best deals and the most up to date properties.
                    </p>
                </div>
                <Link to='/search' className='bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors'>Search Now</Link>
            </div>
            <div className='max-w-6xl mx-auto mt-10 md:mt-20 lg:mt-32'>
                <h2 className='text-2xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-8 lg:mb-12 text-slate-800'>
                    <Link to='/search' className='hover:text-slate-500 transition-colors'>Recent Listings</Link>
                </h2>
                {loading && <p className='text-center text-2xl font-bold my-4'>Loading...</p>}
                {error && <p className='text-center text-red-500 my-4'>{error}</p>}
                {!loading && !error && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                        {recentListings && recentListings.length > 0 ? (
                            recentListings.map((listing) => (
                                <ListingCard key={listing._id} listing={listing} />
                            ))
                        ) : (
                            <p className='text-center col-span-3'>No listings found</p>
                        )}
                    </div>
                )}
                <Link to='/search' className='bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors mt-4 inline-block w-full text-center sm:w-auto sm:mt-0'>View All Listings</Link>
            </div>
        </div>
    )
}

export default Home
