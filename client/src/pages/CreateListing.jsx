const CreateListing = () => {
    return (
        <main className='p-4 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-8'>Create Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4 mt-4'>
                <div className="gap-4 flex-1 flex-col">    
                    <div className="flex flex-col gap-4 mb-8">
                        <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength={62} minLength={10} required/> 
                        <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' maxLength={1500} minLength={10} required/>
                        <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength={50} minLength={4} required/>
                    </div>
                    <div className="flex gap-8 flex-wrap mb-8">
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className='w-5 h-5' />
                            <label htmlFor="sale">Sale</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className='w-5 h-5' />
                            <label htmlFor="rent">Rent</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className='w-5 h-5' />
                            <label htmlFor="parking">Parking</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className='w-5 h-5' />
                            <label htmlFor="furnished">Furnished</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className='w-5 h-5' />
                            <label htmlFor="offer">Offer</label>
                        </div>
                    </div>
                    <div className="flex gap-8 flex-wrap">
                        <div className="flex gap-2 items-center">
                            <input type="number" className='border p-3 rounded-lg' id='bedrooms' min={1} max={8} required/>
                            <label htmlFor="bedrooms">Bedrooms</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" className='border p-3 rounded-lg' id='bathrooms' min={1} max={8} required/>
                            <label htmlFor="bathrooms">Bathrooms</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" className='border p-3 rounded-lg' id='regularPrice' required/>
                            <div className="flex flex-col items-center">
                                <span>Regular Price</span>
                                <span className='text-xm text-gray-500'>($/month)</span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" className='border p-3 rounded-lg' id='discountedPrice' required/>
                            <div className="flex flex-col items-center">
                                <span>Discounted Price</span>
                                <span className='text-xm text-gray-500'>($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="font-bold">Images; 
                        <span className="text-normal text-gray-500"> The first image will be the cover (max 6)</span> 
                    </p>
                    <div className="flex gap-4">
                        <input type="file" id="images" className='p-3 rounded-lg border w-full cursor-pointer' accept='image/*' multiple/>
                        <button type="button" className="border p-3 rounded-lg bg-slate-200 border-green-500 text-green-700 font-bold hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer">Upload</button>
                    </div>
                    <button type="submit" className="border p-3 rounded-lg bg-slate-700 text-white font-bold hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer w-full mt-4">Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing;   
