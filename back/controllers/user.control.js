import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test=(req,res)=>{
    res.json({
        message:"hello my world",
    });
};

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