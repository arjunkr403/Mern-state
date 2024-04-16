import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next)=>{
    const{username,email,password}=req.body;
    const hashpass = bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hashpass});
    try {
        await newUser.save();
        res.status(201).json("account created");
    } catch (error) {
       next(error);
    }
}; 