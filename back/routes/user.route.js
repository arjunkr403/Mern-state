import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.control.js";
import { verifyToken } from "../utils/verifyToken.js";
const router=express.Router();

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser); //id is used to know which user to update
router.delete('/delete/:id',verifyToken,deleteUser); 
export default router;