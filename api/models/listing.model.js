import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    address: { type: String, required: true },
    //country: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: false },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    furnished: { type: Boolean, required: false },
    parking: { type: Boolean, required: false },
    type: { type: String, required: false },
    offer: { type: Boolean, required: false },
    //area: { type: Number, required: true },
    userRef: { type: String, required: true },

}, { timestamps: true });

const Listing = mongoose.model('Listing', ListingSchema);

export default Listing; 
