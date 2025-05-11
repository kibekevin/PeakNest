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

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, 'Listing not found!'));
    if (listing.userRef !== req.user.id) return next(createError(403, 'You are not authorized to delete this listing!'));
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing deleted successfully');
    } catch (error) {
        next(error);
    }
}