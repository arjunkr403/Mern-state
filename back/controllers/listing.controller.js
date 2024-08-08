import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, "Listing not found !!!"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your own listings !!!"));

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found !!!"));
  //req.user.id we get from jwt cookie
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can update your own listings!"));
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //used to get updated one data
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found !!!"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
    try {
      //limit -limits the no. of doc returned
        const limit = parseInt(req.query.limit) || 9;
        //used to skip the specified no. of doc
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
      //$in :- used where the value of a field equals any value in the specified array.
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] };
        }
        let parking = req.query.parking;

        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === "all") {
            type = { $in: ["sale", "rent"] };
        }

        const searchTerm=req.query.searchTerm || ' ';
        const sort =req.query.sort || 'createdAt';
        const order =req.query.order || 'desc';
        
        //regex is build-in search functionality in MongoDb
        //searching is not limited to a word , it can search a part of the word as well
        const listings=await Listing.find({
            name:{$regex: searchTerm, $options:'i'},//i = make search case insensitive
            offer,
            furnished,
            type,
            parking,
          
        }).sort({[sort]:order}).limit(limit).skip(startIndex);
        
        return res.status(200).json(listings); 

    }
    catch (error) {
    next(error);
    }
};
