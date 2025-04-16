const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/shopping_app")
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err.message);
});

module.exports = mongoose.connection;