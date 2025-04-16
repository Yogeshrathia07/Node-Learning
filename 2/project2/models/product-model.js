const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/shopping_app');

const productSchema = new mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,

})

module.exports = mongoose.model('product',productSchema);