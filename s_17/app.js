const express= require('express');
const app=express();

const path=require('path');
app.use(express.static(path.join(__dirname, 'public')));

const userModel=require('./models/user');
const postModel=require('./models/post');
const cookieParser = require('cookie-parser');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const upload=require('./config/multerconfig');


app.get('/profile/update',isloggedin,(req,res)=>{
    res.render('upload');
})

// app.post('/update', isloggedin, upload.single("image"), (req, res) => {
//     console.log(req.file); // This should print uploaded file details
//     res.redirect('/profile');
// });

app.post('/update', isloggedin, upload.single("image"), async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    console.log(req.file); 
    user.profilePic = req.file.filename;
    await user.save(); 
    res.redirect('/profile');
})

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/login',(req,res)=>{
    res.render('login');
});



app.post('/register',async (req,res)=>{
    let {name,email,password,username,age}=req.body;
    // res.render('register');
    let user=await userModel.findOne({email});
    if(user){
        return res.status(400).send({message:'User already exists'});
    }

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user=await userModel.create({
                username,
                email,
                password:hash,
                age,
                name
            })
            let token=jwt.sign({email:email,userid: user._id},"abcd");
            res.cookie('token',token,{httpOnly:true});
            res.status(200).send({message:'User registered successfully'});
        })

    })

});
app.post('/login',async (req,res)=>{
    let {email,password}=req.body;
    // res.render('register');
    let user=await userModel.findOne({email});
    if(!user){
        return res.status(400).send("Something went wrong!");
    }

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:email,userid: user._id},"abcd");
            res.cookie('token',token);
            // res.status(200).send('User logged in successfully');
            return res.redirect('/profile');
        }
        else res.status(400).send('Invalid credentials');
    })

});

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/login');
})


app.get('/profile',isloggedin,async (req,res)=>{
    // let user=await userModel.findOne({email:req.user.email});
    let user = await userModel.findOne({ email: req.user.email }).populate('posts');
    console.log(req.user);
    // user.populate('posts');
    res.render('profile',{user});
})

app.get('/like/:id', isloggedin, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user');

    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect('/profile');
});


app.get('/edit/:id', isloggedin, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user');
    res.render('edit', { post });
});
app.post('/update/:id', isloggedin, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
    // post.content=req.body.content;
    res.redirect('/profile');
});




function isloggedin(req,res,next){
    const token = req.cookies.token;
    if (!token) {
        // return res.status(401).send("You are not logged in! Token missing.");
        return res.redirect('/login');
    }
    else
    {
        let data=jwt.verify(token,"abcd");
        req.user=data;
    }
    next();
}

app.post('/post',isloggedin,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    let post=await postModel.create({
        user:user._id,
        content:req.body.content
    })
    user.posts.push(post._id);
    await user.save();
    console.log("post created successfully");
    res.redirect('/profile');
})


app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});