const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    items:{
        type:Array,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required :true,
        default:"Order Placed"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Number,
        required:true
    }
})

const Order =  mongoose.models.order || mongoose.model("order",orderSchema);

module.exports = Order;