const express=require("express");
// const userModel=require('../models/user-model');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');

// const{generateToken}=require("../utils/generateToken");

const{registerUser,
    loginUser,
    logoutUser
}=require("../controllers/authController");

const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Hello-Users");
});

router.post("/register", registerUser);
router.post("/login",loginUser);

router.get("/logout",logoutUser);

module.exports=router;