const express = require("express");
const { adminLogin,loginUser,userRegister } = require("../controllers/userController.js")


const userRouter = express.Router()

userRouter.post("/register",userRegister);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);

module.exports = userRouter;