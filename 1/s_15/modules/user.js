const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AuthenticationDB',);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
});

module.exports = mongoose.model('User', userSchema);
