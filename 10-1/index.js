const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.send(`
    <form action="/" method="POST">
    <input type="text" name="homeName"> 
    <button type="submit">Add Home</button>
    </form>
    `)
})

app.post("/",(req,res)=>{
    console.log(req.body);
    // console.log(req.body);
    res.send(`
    <h1>Home Added</h1>
    <p>${req.body.homeName}</p>
    `)
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
});