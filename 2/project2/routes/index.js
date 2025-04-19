const express = require('express');
const router = express.Router();
const productsModel=require("../models/product-model");
const userModel=require("../models/user-model");

const isLoggedin = require('../middlewares/isLoggedin');

router.get('/', (req, res) => {
    let error=req.flash('error');
    // res.send(error);
    res.render('index', { error ,loggedin:false});
});

router.get("/shop",isLoggedin,async (req,res)=>{
    let success=req.flash('success');
    const products = await productsModel.find();
    res.render("shop",{products,success});
})

router.get("/addtocart/:id",isLoggedin,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Product added to cart");
    res.redirect("/shop");
})
router.get("/cart",isLoggedin,async (req,res)=>{
    let user=await userModel
    .findOne({email:req.user.email})
    .populate("cart");
    console.log(user.cart);
    res.render("cart",{user});
})

module.exports = router;