const express=require("express");
// const userModel=require('../models/user-model');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');

// const{generateToken}=require("../utils/generateToken");

const{registerUser}=require("../controllers/authController");

const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Hello-Users");
});

router.post("/register", registerUser);


module.exports=router;