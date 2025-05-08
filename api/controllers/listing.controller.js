import Listing from '../models/listing.model.js';


export const createListing = async (req, res, next) => {
    const listing = new Listing(req.body);
    try {
        await listing.save();
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}


