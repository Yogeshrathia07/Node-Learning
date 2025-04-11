const express = require('express');
const app=express();
const path=require('path');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const userModel = require('./modules/user');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

app.get('/',(req,res)=>{
    res.render('index');
})

// app.post('/register',async (req,res)=>{
//     const {name,email,password,age}=req.body;
//     let user=await userModel.create({
//         name,
//         email,
//         password,
//         age
//     })
//     res.redirect('/');
// })

app.post('/register', (req, res) => {
    let { name, email, password, age } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let created_user = await userModel.create({
                name,
                email,
                password: hash,
                age
            });
            let token = jwt.sign({ email }, 'password');
            res.cookie('token', token);
            res.redirect('/');
        });
    });
});


app.get('/logout',(req,res)=>{
    res.clearCookie('token','');
    res.redirect('/');
})

app.get('/login',async (req,res)=>{
    res.render('login');
})

app.post('/login',async (req,res)=>{
    let user=await userModel.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({message:'User not found'});
    }
    console.log(req.body.password,user.password);
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({ email: req.body.email }, 'password');
            res.cookie('token', token);
            res.redirect('/');
        }
        else res.send('Login failed');
    })

})

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})