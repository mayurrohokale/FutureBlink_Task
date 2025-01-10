const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {type:String, unique:false},
    email: {type:String, unique:true},
    password: {type:String, unique:false},
    role: {type:String, unique:false},
    created_at: {type:Date, default:Date.utcnow},



});
const User = mongoose.model('User', userSchema);
module.exports = User;