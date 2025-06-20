import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [contactSeller, setContactSeller] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState(null);

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

    // Close full screen image when pressing Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setFullScreenImage(null);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

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
                                    <div 
                                        className='h-[500px] cursor-pointer' 
                                        style={{background: `url(${url}) center no-repeat`, backgroundSize: 'contain'}}
                                        onClick={() => setFullScreenImage(url)}
                                    > 
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Full Screen Image Modal */}
                        {fullScreenImage && (
                            <div 
                                className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'
                                onClick={() => setFullScreenImage(null)}
                            >
                                <button 
                                    className='absolute top-4 right-4 text-white text-2xl hover:text-gray-300'
                                    onClick={() => setFullScreenImage(null)}
                                >
                                    <FaTimes />
                                </button>
                                <img 
                                    src={fullScreenImage} 
                                    alt="Full size" 
                                    className='max-h-[90vh] max-w-[90vw] object-contain'
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        <div className='fixed top-[13%] right-[3%] sm:right-[4%] md:right-[24%] z-10 bg-white rounded-full p-2 cursor-pointer'>
                            <FaShare onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}/>
                        </div>
                        {copied && <span className='text-green-500 text-sm fixed top-[13%] right-[3%] sm:right-[4%] md:right-[24%] z-10 bg-white rounded-full p-2 cursor-pointer'>Link Copied!</span>}
                        <div className="flex flex-col gap-4 p-4 md:pl-[2rem] lg:pl-[17rem]">
                            <p className='text-2xl font-bold max-w-[760px]'>{listing.title}</p>
                            <div className='flex gap-4'>
                                <p className='font-semibold text-white bg-black px-3 py-1 rounded-md max-w-fit'>
                                    {listing.type === 'rent' ? 'Rental' : 'On Sale'}
                                </p>
                                { listing.offer && listing.regularPrice && listing.discountedPrice && (
                                    <p className='text-white font-semibold bg-green-500 px-3 py-1 rounded-md max-w-fit'>
                                        Discount: ${(listing.regularPrice - listing.discountedPrice).toLocaleString()}
                                    </p>
                                )}
                            </div>
                            <p className='font-bold text-2xl hover:text-blue-500 w-fit'>
                                ${listing.offer && listing.discountedPrice ? 
                                    listing.discountedPrice.toLocaleString() : 
                                    listing.regularPrice ? listing.regularPrice.toLocaleString() : '0'} 
                                {listing.type === 'rent' && ' / month'}
                            </p>
                            <p className='flex items-center gap-2 text-md text-gray-500'>
                                <FaMapMarkerAlt/> {listing.address}
                            </p>
                           
                            <div className='my-6 max-w-[760px]'>
                                <h3 className='text-lg font-bold'>Features</h3>
                                <ul className='flex gap-4 flex-wrap'>
                                    <li className='flex items-center gap-1 whitespace-nowrap hover:bg-slate-300 p-2 rounded-md'>
                                        <FaBed/>
                                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                                    </li>
                                    <li className='flex items-center gap-1 whitespace-nowrap hover:bg-slate-300 p-2 rounded-md'>
                                        <FaBath/>
                                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                                    </li>
                                    <li className='flex items-center gap-1 whitespace-nowrap hover:bg-slate-300 p-2 rounded-md'>
                                        <FaParking/>
                                        {listing.parking ? 'Parking' : 'No Parking'}
                                    </li>
                                    <li className='flex items-center gap-1 whitespace-nowrap hover:bg-slate-300 p-2 rounded-md'>
                                        <FaChair/>
                                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                                    </li>
                                </ul>
                            </div>
                            {listing.description && 
                                <div className='max-w-[760px]'>
                                    <h3 className='text-lg font-bold'>Description</h3>
                                    <p>
                                        {listing.description}
                                    </p>
                                </div> 
                            }
                            {currentUser && !contactSeller && (
                                <button className='bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-fit hover:bg-slate-800 mt-6 mb-10 cursor-pointer' onClick={() => setContactSeller(true)}>
                                    <FaPhoneAlt/> Contact Seller
                                </button>
                            )}
                            {contactSeller && <Contact listing={listing} />}
                        </div>
                    </>
                )}  
            </div>
        </main>
    )
}

export default Listing;

