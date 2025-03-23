const express=require('express');
const path = require('path'); 
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// __dirname is current path
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');


app.get("/",function(req,res){
    // res.send("This is working");
    res.render("index");
})
app.get("/author/:user_name/:age",function(req,res){
    res.send(`Hello! ${req.params.user_name} of age ${req.params.age}`)
})

app.listen(3000,()=>{
    console.log("Working!");
})
