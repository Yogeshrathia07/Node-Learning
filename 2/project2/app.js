const express= require('express');
const app=express();
const cookieParser= require('cookie-parser');
const path=require('path');
const db=require('./config/mongoose-connection');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');

app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

// app.get('/',(req,res)=>{
//     // res.render('index');
//     res.send('Hello World!');
// })

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000')
})