const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    cartData : {
        type:Object,
        default:{}
    }
},{minimize:false})

const User =  mongoose.models.user || mongoose.model("user",userSchema);

module.exports = User;