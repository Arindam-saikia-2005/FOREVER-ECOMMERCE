const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");
const userRouter = require("./routes/userRoute.js");
const productRouter = require("./routes/productRoute.js");
const cartRouter = require("./routes/cartRoute.js")
const orderRouter = require("./routes/orderRoute.js");


// App Config
const app = express();
const port = process.env.PORT || 4001;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());                    
app.use(cors());

// Api endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port,()=>console.log(`Server is Started at port ${port}`))
