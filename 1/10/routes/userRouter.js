const express = require('express');
const userRouter = express.Router();
const path = require('path');
const root_dir = require('../utils/pathUtil');

userRouter.get("/add-home",(req,res)=>{
    res.sendFile(path.join(root_dir,"/views/add-home-form.html"));
})
userRouter.post("/add-home",(req,res,next)=>{
    res.sendFile(path.join(root_dir,"/views/add-home-form-res.html")); 
})

module.exports = userRouter;