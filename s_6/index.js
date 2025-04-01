const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views','views');

const path=require('path');
app.use(express.static(path.join(__dirname,'public')));

const fs=require('fs');

app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{file:files});
    });
    // res.render("index");
});

app.get("/details",(req,res)=>{
    res.render("details");
})


app.get("/details/:file_name", (req, res) => {
    fs.readFile(`./files/${req.params.file_name}`, 'utf-8', (err, data) => {
        console.log(data);
        res.render("details", { f_name: req.params.file_name,d_name: data });
    });
});

app.post("/submit",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`,req.body.description,(err)=>{
        res.redirect("/");
    });

})



app.get("/profile/:user_name",(req,res)=>{
    res.send(`Hello ! ${req.params.user_name}`);
});

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
});