import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';


const Search = () => {

    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorGettingListings, setErrorGettingListings] = useState(false);
    const [showMoreListings, setShowMoreListings] = useState(false);

    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'createdAt',
        order: 'desc',
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const offerFromUrl = urlParams.get('offer');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(searchTermFromUrl || typeFromUrl || offerFromUrl || parkingFromUrl || furnishedFromUrl || sortFromUrl || orderFromUrl) {
            setSideBarData({...sideBarData, searchTerm: searchTermFromUrl || '', type: typeFromUrl || 'all', offer: offerFromUrl === 'true' ? true : false, parking: parkingFromUrl === 'true' ? true : false, furnished: furnishedFromUrl === 'true' ? true : false, sort: sortFromUrl || 'createdAt', order: orderFromUrl || 'desc'});
        }

        const fetchListings = async () => {
            try {
                setErrorGettingListings(false);
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                if(data.length > 8) {
                    setShowMoreListings(true);
                }else{
                    setShowMoreListings(false);
                }
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setShowMoreListings(false);
                setErrorGettingListings(true);
                setLoading(false);
            }
        }

        fetchListings();

    },[location.search])

    const handleChange = (e) => {
        if(e.target.id === 'all') {
            setSideBarData({...sideBarData, type: 'all'});
        } else if(e.target.id === 'sale') {
            setSideBarData({...sideBarData, type: 'sale'});
        } else if(e.target.id === 'rent') {
            setSideBarData({...sideBarData, type: 'rent'});
        }
        if(e.target.id === 'search-term') {
            setSideBarData({...sideBarData, searchTerm: e.target.value});
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarData({...sideBarData, [e.target.id]: e.target.checked || e.target.id === 'true' ? true : false});
        }
        if(e.target.id === 'sort-order') {
            const sort = e.target.value.split('-')[0] || 'createdAt';
            const order = e.target.value.split('-')[1] || 'desc';
            setSideBarData({...sideBarData, sort, order});
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    const handleShowMoreListings = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const startIndex = listings.length;
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings([...listings, ...data]);
        if(data.length < 9) {
            setShowMoreListings(false);
        }
    }
    return (
        <div className='p-4 gap-4 flex flex-col md:flex-row'>
            <div className='border-b-2 border-slate-200 pb-2 sm:border-r-2 sm:border-b-0 md:min-h-screen md:flex-2'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex gap-2 items-center'>
                        <label className='text-slate-600 whitespace-nowrap font-bold'>Search Term</label>
                        <input type="text" placeholder='Search. e.g. "Apartment"' className=' p-2 rounded-md border-2 border-slate-300' id='search-term' value={sideBarData.searchTerm} onChange={handleChange}/>
                    </div>
                    <div>
                        <h2 className='text-slate-600 font-bold'>Filters</h2>
                        <div className='flex gap-4 flex-wrap items-center'>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="all" checked={sideBarData.type === 'all'} onChange={handleChange}/>
                                <span>Sale & Rent</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="sale" checked={sideBarData.type === 'sale'} onChange={handleChange}/>
                                <span>Sale</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="rent" checked={sideBarData.type === 'rent'} onChange={handleChange}/>
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="offer" checked={sideBarData.offer} onChange={handleChange}/>
                                <span>Offer</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="parking" checked={sideBarData.parking} onChange={handleChange}/>
                                <span>Parking</span> 
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="furnished" checked={sideBarData.furnished} onChange={handleChange}/>
                                <span>Furnished</span>
                            </div> 
                        </div>
                        <div className='flex gap-2 items-center mt-4'>
                            <label className='text-slate-600 font-bold'>Sort By:</label>
                            <select className='p-2 rounded-md border-2 border-slate-300' onChange={handleChange} defaultValue={'createdAt-desc'} id='sort-order'>
                                <option value="regularPrice-asc">Price: Low to High</option>
                                <option value="regularPrice-desc">Price: High to Low</option>
                                <option value="createdAt-asc">Date: Old to New</option>
                                <option value="createdAt-desc">Date: New to Old</option>
                            </select>
                        </div>
                    </div>
                    <button className='bg-slate-600 text-white p-2 rounded-md min-w-24 self-center mt-4 hover:bg-slate-700 transition-colors cursor-pointer'>Search</button>
                </form>
                
            </div>
            <div className='flex flex-col gap-4 p-1 md:flex-8'>
                <h1 className='text-2xl font-bold text-center text-black'>Search Results</h1>
                <div className='flex flex-wrap gap-4 w-full'>
                    {!loading && listings.length === 0 && (
                        <p className='text-center text-slate-600 font-bold w-full'>No listings found!</p>
                    )}
                    {errorGettingListings && (
                        <p className='text-center text-red-500 w-full'>Error getting listings</p>
                    )}
                    {loading && (
                        <p className='text-center text-slate-600 font-bold w-full'>Loading...</p>
                    )}
                    {!loading && !errorGettingListings && listings && listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing}/>
                    ))}
                </div>
                {showMoreListings && (
                    <button className='bg-slate-600 text-white p-2 rounded-md min-w-24 self-center mt-4 hover:bg-slate-700 transition-colors cursor-pointer' onClick={handleShowMoreListings}>Show More</button>
                )}
            </div>
        </div>
    );
};

export default Search;