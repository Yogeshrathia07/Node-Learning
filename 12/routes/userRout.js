const express=require('express');
const userRouter=express.Router();

const path=require('path');
const rootDir=require("../utils/pathUtil")

userRouter.get("/",(req,res)=>{
    // res.send(`
    // <form action="/user" method="POST">
    // <input type="text" name="homeName"> 
    // <button type="submit">Add Home</button>
    // </form>
    // `)
    // res.sendFile(path.join(__dirname,"..","views","add-home-form.html"));
    res.sendFile(path.join(rootDir,"views","add-home-form.html"));
})

const data=[];
userRouter.post("/",(req,res)=>{
    console.log(req.body);
    // console.log(req.body);
    console.log(req.body.homeName);
    data.push({house_name:req.body.homeName});
    // res.send(`
    // <h1>Home Added</h1>
    // <p>${req.body.homeName}</p>
    // <a href="/">Back</a>
    // `)
    res.sendFile(path.join(rootDir,"views","add-home-form-res.html"));
})

module.exports={userRouter,data};
// module.exports={ userRouter,data };