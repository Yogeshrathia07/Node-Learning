const cookieParser=require('cookie-parser');
const express=require('express');
const app=express();

const jwt=require('jsonwebtoken');

app.use(cookieParser());
const bcrypt=require('bcrypt');

app.get("/", (_req, res) => {
    bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash("123456", salt, (_err, hash) => {
            console.log(hash);
        });
    });
    res.send("Hash generated and logged.");
});

app.get("/jwt",(req,res)=>{
    let token=jwt.sign({email:"yogesh@gmail.com"},"secret");
    res.cookie("token",token,{httpOnly:true});
    res.send("JWT token generated and sent as cookie.");
})

app.get("/verify",(req,res)=>{
    let data=jwt.verify(req.cookies.token,"secret");
    console.log(data);
})


app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})