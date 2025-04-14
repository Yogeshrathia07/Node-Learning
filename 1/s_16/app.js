const express = require('express');
const app = express();

const userModel=require('./models/user');
const postModel=require('./models/post');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/create', async(req,res)=>{
    let user=await userModel.create({
        username:"yogi",
        age:25,
        email:"yogi@gmail.com"
    })
    res.redirect('/');
})

app.get('/post/create',async (req,res)=>{
    let post=await postModel.create({
        postdata:"Hello World",
        user:"67f92fac51587602601e8d9b"
    })

    let user=await userModel.findById("67f92fac51587602601e8d9b");
    user.posts.push(post._id);
    await user.save();
    res.send(post,user);
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});