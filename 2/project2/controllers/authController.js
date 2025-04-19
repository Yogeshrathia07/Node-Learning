const userModel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const generateToken=require("../utils/generateToken");

module.exports.registerUser= async (req,res)=>{
    try{
        let {fullname,email,password}=req.body;

        let user=await userModel.findOne({email});
        if(user) return res.status(400).send("User Already Exists");

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) res.send(err.message);
                else{
                    let user=await userModel.create({
                        fullname,
                        email,
                        password:hash
                    });
                    // let token=jwt.sign({email,id:user._id},"hello");
                    let token=generateToken(user);
                    res.cookie("token",token);
                    // res.send("User Created Successfully");
                    // res.redirect("/shop",{products:productModel});
                    res.redirect("/shop");

                    // res.send(user);
                }
            })
        })
    }
    catch(err){
        console.log(err);
        // res.status(500).send("Internal Server Error");
        let error=flash("error","Internal Server Error");
        res.redirect("/",{error});
    }
};

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    console.log("email is:", email);
    let user = await userModel.findOne({ email });

    if (!user) {
        req.flash("error", "User Not Found");
        return res.redirect("/");
    }

    console.log("full name is:", user.fullname);
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            // res.redirect("/shop",{products:productModel});
            res.redirect("/shop");

        } else {
            req.flash("error", "Invalid Credentials");
            res.redirect("/");
        }
    });
};

module.exports.logoutUser = (req, res) => {
    res.clearCookie("token");
    // res.send("Logout Successful");
    res.redirect("/");
};