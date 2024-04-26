import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin= async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validuser = await User.findOne({email});
        if(!validuser) return next(errorHandler(404, 'User not found!'));
        const validpass =bcryptjs.compareSync(password,validuser.password);
        if(!validpass) return next(errorHandler(401, 'Wrong credentials!'));
        const token =jwt.sign({ id:validuser._id},process.env.jwt_secret);
        const {password: pass, ...rest}=validuser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
};