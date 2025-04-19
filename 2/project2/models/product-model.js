const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/shopping_app');

const productSchema = new mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model('product',productSchema);