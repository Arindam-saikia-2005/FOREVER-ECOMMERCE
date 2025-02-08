const Order = require("../models/orderModel.js");
const User = require("../models/userModel.js");
const razorpay = require("razorpay")


// global variables
const currency = "INR"
const delieveryCharge = 10

// gateway initialize
const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET_KEY
})


// placing orders using COD method
const placeOrder = async (req,res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

      const newOrder = new Order(orderData)
      await newOrder.save();

    //   for clearing the cart Data
      await User.findByIdAndUpdate(userId,{cartData:{}})

      res.json({
        success:true,
        message:"Order Placed"
      })
    } catch (error) {
        console.log("Error occurs in orderController component",error);
        res.json({
            success:false,
            message:error.message
        })
    }
}
// placing orders using Stripe method
const placeOrderStripe = async (req,res) => {

}

// placing orders using razorpay method
const placeOrderRazorpay = async (req,res) => {
    try {
      const {userId, items, amount, address} = req.body
        
      // Save order database **only after** successfyll Razorpay order
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"Razorpay",
        payment:false,
        date:Date.now()
      }

      // saving in mongodb
      const newOrder =  new Order(orderData)
      await newOrder.save()

      const options = {
        amount: amount * 100,
        currency:currency,
        receipt:newOrder._id.toString()
      }

      await razorpayInstance.orders.create(options)

    } catch (error) {
      console.log(error)
      res.json({
        success:false,
        message:error.message
      })
    }
}

const verifyRazorpay = async(req,res) => {
  try {
    const { userId, razorpay_order_id } = req.body

   const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
   if(orderInfo.status === "paid") {
    await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
    await User.findByIdAndUpdate(userId,{cartData:{}})
    res.json({
      success:true,
      message:"payment successful"
    })
   } else {
    res.json({
      success:false,
      message:"payment false"
    })
   }

  } catch (error) {
    console.log(error)
    res.json({
      success:false,
      message:error.message
    })
  }
}


// All Orders data for Admin panel
const allOrders = async(req,res) => {
  try {
   const orders = await Order.find({})
   res.json({
    success:true,
    orders
   })

  } catch (error) {
    console.log("Error occurs in orderController ",error)
    res.json({
      success:true,
      message:error.message
    })
  }
}

// User Order Data for frontend
const userOrders = async (req,res) =>{
  try {
    const { userId } = req.body

    const orders = await Order.find({userId})
    res.json({
      success:true,
      orders
    })
  } catch (error) {
    console.log("Error occurs in orderController",error)
    res.json({
      success:false,
      message:error.message
    })
  }
}

// update order status for Admin 

const updateStatus =  async(req,res) => {
   try {
    
     const { orderId, status  } = req.body

     await Order.findByIdAndUpdate(orderId,{status})
     res.json({
      success:true,
      message:"Status Updated"
     })

   } catch (error) {
    console.log(error)
    res.json({
      success:false,
      message:error.message
    })
   }
}

module.exports = {
    placeOrder, 
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyRazorpay
}