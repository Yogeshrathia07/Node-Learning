const express=require('express');
const userRouter=express.Router();

userRouter.get("/",(req,res)=>{
    res.send(`
    <form action="/user" method="POST">
    <input type="text" name="homeName"> 
    <button type="submit">Add Home</button>
    </form>
    `)
})
userRouter.post("/",(req,res)=>{
    console.log(req.body);
    // console.log(req.body);
    res.send(`
    <h1>Home Added</h1>
    <p>${req.body.homeName}</p>
    <a href="/">Back</a>
    `)
})

module.exports=userRouter;