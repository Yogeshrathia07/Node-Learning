const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(function(req,res,next){
    console.log("This is middleware");
    next();
});

app.get("/",function(req,res){
    res.send("This is page 1");
});

app.get("/2",function(req,res){
    res.send("This is page 69");
});

// Error Handler-----------------------------
app.get("/3",function(req,res,next){
    return next(new Error("Something went wrong backend"))
});
app.use(function(err,req,res,next){
    console.error(err.stack)
    res.status(500).send('Something went wrong frontend')
})

app.listen(3000)
// localhost:3000