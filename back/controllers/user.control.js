import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
//test 'back' route
export const test=(req,res)=>{
    res.json({
        message:"hello my world",
    });
};
//update 'back' route
export const updateUser= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your own account'))
    try {
        if(req.body.password){
            req.user.password = bcryptjs.hashSync(req.body.password,10)
        }
//by checking id it can update using $set property the individual entries, such as if u provide a new username it will update than and new:true will return that
        const updateUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new: true})  //return and save updateUser with new information , without this updateuser will have the old data for your response
        const {password,...rest}=updateUser._doc //seperate password and rest data
        res.status(200).json(rest);
    } catch (error) {
            next(error)
    }
};


//delete 'back' route
export const deleteUser =async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only delete your own account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');//delete the current cookie first
        res.status(200).json('User has been deleted!');// then send response of success
    } catch (error) {
        next(error)
    }
};


//get user listing 'back' route
export const getUserListings = async(req,res,next)=>{
// Check if the user making the request is the same as the user whose listings are being requested
    if(req.user.id === req.params.id){
        try {
            // Find all listings associated with the user ID
            const listings = await Listing.find({
                userRef:req.params.id});
                // Respond with the listings in JSON format
                res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    }
    else{
        return next(errorHandler(401,'You can only view your own listings!'));
    }
};



export const getUser = async (req, res, next) => {
    try {//store the user information according to the requested id in the User model and store information(username,pass,email,avatar) corresponding to the 'id' in the user var
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not found !!!'));
    //seperate password from the rest of information for privacy 
    const { pass, ...rest } = user._doc;
        res.status(200).json(rest);//change response into json format
    
} catch (error) {
    next(error)
}  
};