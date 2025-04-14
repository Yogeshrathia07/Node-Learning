const express = require('express');
const app=express();
const userModel=require('./usermodel');


app.get('/',(req,res)=>{
    res.send(`Hello`)
})

app.get('/create',async (req,res)=>{
    let created_user=await userModel.create({
        name: "Yogesh",
        username: "yogesh1234",
        email:"yogesh.rathia07@gmail.com"
    })
    res.send(created_user);
})

app.get('/update',async (req,res)=>{
    let updated_user=await userModel.findOneAndUpdate({username:"yogesh123"},{name:"Yogesh Rathia"},{new:true});
    res.send(updated_user);
})

app.get('/read',async (req,res)=>{
    let user=await userModel.find({});
    // find gives array of all users

    // let user=await userModel.find({username:"yogesh1234"});
    // find gives array

    // let user=await userModel.findOne({username:"yogesh1234"});
    // findOne gives object and findone will give the first person
    res.send(user);
})

app.get('/delete',async (req,res)=>{
    let user=await userModel.findOneAndDelete({username:"yogesh123"});
    res.send(user);
    // findOneAndDelete will delete the first person
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})