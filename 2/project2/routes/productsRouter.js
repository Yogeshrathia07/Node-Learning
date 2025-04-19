const express=require("express");
const router=express.Router();
const upload=require("../config/multer-config");
const productsModel = require('../models/product-model');

router.get("/",(req,res)=>{
    res.send("Hello-Products");
})

router.post("/create",upload.single("image"),async (req,res)=>{
    try{
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
        let products=await productsModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
        });
        req.flash("success","Product Created Successfully");
        res.redirect("/owners/admin");
    }
    catch(err){
       res.send(err.message);
    }
    
});




module.exports=router;