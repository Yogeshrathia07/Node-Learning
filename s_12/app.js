const express=require('express');
const app=express();

const path=require('path');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const userRouter=require('./modules/user');


app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/read', async (req,res)=>{
    let all_users=await userRouter.find({});
    res.render('read', {users: all_users});
    // res.render('read')
})

app.post('/create', async (req, res) => {
    let createuser = await userRouter.create({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image
    });
    res.redirect('/read');
});
app.get('/delete/:id', async (req, res) => {
    let deleteuser = await userRouter.findByIdAndDelete(req.params.id);
    res.redirect('/read');
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
})