const Search = () => {
    return (
        <div className='p-4 gap-4 flex flex-col md:flex-row'>
            <div className='border-b-2 border-slate-200 pb-2 sm:border-r-2 sm:border-b-0 md:min-h-screen md:w-1/4'>
                <form className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <label className='text-slate-600 whitespace-nowrap font-bold'>Search Term</label>
                        <input type="text" placeholder='Search. e.g. "Apartment"' className='w-full p-2 rounded-md border-2 border-slate-300' />
                    </div>
                    <div>
                        <h2 className='text-slate-600 font-bold'>Filters</h2>
                        <div className='flex gap-4 flex-wrap items-center'>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="all" />
                                <span>Sale & Rent</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="sale" />
                                <span>Sale</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="rent" />
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="offer" />
                                <span>Offer</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="parking" />
                                <span>Parking</span> 
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id="furnished" />
                                <span>Furnished</span>
                            </div> 
                        </div>
                        <div className='flex gap-2 items-center mt-4'>
                            <label className='text-slate-600 font-bold'>Sort By:</label>
                            <select className='p-2 rounded-md border-2 border-slate-300'>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="date-asc">Date: Old to New</option>
                                <option value="date-desc">Date: New to Old</option>
                            </select>
                        </div>
                    </div>
                    <button className='bg-slate-600 text-white p-2 rounded-md min-w-24 self-center mt-4 hover:bg-slate-700 transition-colors cursor-pointer'>Search</button>
                </form>
                
            </div>
            <div>
                <h1 className='text-2xl font-bold text-center text-black'>Search Results</h1>
            </div>
        </div>
    );
};

export default Search;