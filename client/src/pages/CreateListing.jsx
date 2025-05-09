import { useState, useEffect } from "react";

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 15) {
            setUploadError('Maximum 15 images allowed');
            return;
        }

        // Create preview URLs for selected images
        const previews = selectedFiles.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));

        setFiles(selectedFiles);
        setImagePreviews(previews);
        setUploadError(null);
    };

    const removeImage = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        
        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(imagePreviews[index].url);
        
        setFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    const handleUpload = async () => {
        if (files.length === 0 || files.length > 15) {
            setUploadError('Error uploading images. Please try again.');
            return;
        }
        
        setUploading(true);
        setUploadError(null);
        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('upload_preset', 'peaknest');

            try {
                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/dnfnbnmwr/image/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                const data = await response.json();
                uploadPromises.push(data.secure_url);
            } catch (error) {
                console.error('Error uploading image:', error);
                setUploadError('Error uploading image. Please try again.');
            }
        }

        try {
            const urls = await Promise.all(uploadPromises);
            setImageUrls(urls);
            console.log('Uploaded images:', urls);
            setUploadError(null);
            // Clear image previews after successful upload
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
            setImagePreviews([]);
            setFiles([]);
        } catch (error) {
            console.error('Error uploading images:', error);
            setUploadError('Error uploading images. Please try again.');
        } finally {
            setUploading(false);
        }
    }

    // Cleanup preview URLs when component unmounts
    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        };
    }, []);

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
                        <span className="text-normal text-gray-500"> The first image will be the cover (max 15)</span> 
                    </p>
                    <div className="flex gap-4">
                        <input 
                            onChange={handleFileChange} 
                            type="file" 
                            id="images" 
                            className='p-3 rounded-lg border w-full cursor-pointer' 
                            accept='image/*' 
                            multiple
                        />
                        <button 
                            onClick={handleUpload} 
                            type="button" 
                            disabled={uploading || files.length === 0}
                            className="border p-3 rounded-lg bg-slate-200 border-green-500 text-green-700 font-bold hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    
                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="mt-4">
                            <p className="font-semibold mb-2">Selected Images:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img 
                                            src={preview.url} 
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                                Cover Image
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
                    <button 
                        type="submit" 
                        disabled={imageUrls.length === 0}
                        className="border p-3 rounded-lg bg-slate-700 text-white font-bold hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer w-full mt-4"
                    >
                        Create Listing
                    </button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing;   
