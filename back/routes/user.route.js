import express from "express";
import { deleteUser, getUserListings, test, updateUser } from "../controllers/user.control.js";
import { verifyToken } from "../utils/verifyToken.js";
const router=express.Router();


// Test route to check if the server and routing are working correctly
router.get('/test',test);
//verifytoken is used to provide a valid token for authentication 
// Route to update a user's information which requires user ID as a parameter
router.post('/update/:id',verifyToken,updateUser);

//Route to delete a user which requires user ID as a parameter
router.delete('/delete/:id',verifyToken,deleteUser);

//Route to get listings for a specific user which requires user ID as a parameter
router.get('/listings/:id',verifyToken,getUserListings);



export default router;