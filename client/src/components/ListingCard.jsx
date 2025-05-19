import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ListingCard = ({listing}) => {
    return (
        <div className='bg-slate-100 rounded-lg w-[21rem] sm:w-[21rem] md:w-[22rem] lg:w-[22rem] p-2 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listing cover' className='h-64 w-full object-cover rounded-lg mb-2'/>
                <div className='flex flex-col gap-2'>
                    <p className='text-slate-500 text-xl font-bold'>{listing.regularPrice.toLocaleString('en-US', {style: 'currency', currency: 'KSH'})}
                    {listing.type === 'rent' && '/month'}
                    </p>
                    <p className='text-slate-600 font-bold truncate'>{listing.title}</p>
                    <div className='flex items-center gap-2'>
                        {<span>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}</span>}
                        {<span>{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}</span>}
                    </div>
                    <div className='flex items-center gap-2'>
                        <MdLocationOn className='text-green-700'/>
                        <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ListingCard;