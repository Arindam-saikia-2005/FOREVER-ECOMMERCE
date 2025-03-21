const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestseller:{
        type:Boolean
    },
    date:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Product =  mongoose.models.product || mongoose.model("product",productSchema);

module.exports = Product;