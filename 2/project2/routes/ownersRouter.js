const express=require("express");
const router=express.Router();
const ownerModel = require('../models/owner-model');

router.get("/",(req,res)=>{
    res.send("Hello-owners");
})

router.post("/create",async (req,res)=>{
    let owners=await ownerModel.find();
    if(owners.length>0){
        res.status(400).send("Owner already exists");
    }
    let {fullname,email,password}=req.body;

    let createOwner=await ownerModel.create({
        fullname,
        email,
        password
    });
    res.send(createOwner);
    // res.send("Create Owner API");
})

module.exports=router;