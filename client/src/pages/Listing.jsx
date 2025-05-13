import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await fetch(`/api/listing/get/${params.id}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.id]);
    return (
        <main>
            <div className='container mx-auto'>
                {loading && <p className='text-center text-2xl font-bold my-4'>Loading...</p>}
                {error && <div className='text-center text-2xl font-bold my-4 flex flex-col items-center gap-4'>Error loading listing <button className='bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer' onClick={() => window.location.reload()}>Reload</button> <button className='bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer'><Link to='/'>Home Page</Link></button></div> }
                {listing && !loading && !error && (
                    <>
                        <Swiper navigation modules={[Navigation]}>
                            {listing.imageUrls.length > 0 && listing.imageUrls.map((url) => (
                                <SwiperSlide key={url}>
                                    <div className='h-[500px]' style={{background: `url(${url}) center no-repeat`}}> 
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}  
            </div>
        </main>
    )
}

export default Listing;

