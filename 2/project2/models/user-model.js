const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/shopping_app');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        minlength:3,
        trim:true,
    },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:'product'
    }],
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
})

module.exports = mongoose.model('user',userSchema);