const User = require("../models/userModel.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generating a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credential",
      });
    }
  } catch (error) {
    console.log("Error is occur during loging", error);
    res.status(501).json({
      success: false,
      error,
    });
  }
};

// Route for user registration
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user already exist or not
    const exsist = await User.findOne({ email });
    if (exsist) {
      return res.json({ success: false, message: "User already exist" });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong password",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      name,
      email,
      password: hashPassword,
    });

    //   for saving the new user in the database
    const user = await newUser.save();
    console.log(user);
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("this error is occur during registeration", error);
    res.json({ success: false, message: error.message }).status(501);
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email,password } = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({
        success:true,
        token
      })
    } else {
      res.json({
        success:false,
        message:"Invalid Credentials"
      })
    }
  } catch (error) {
    console.log("Error is occur while admin login ",error);
    res.json({
      success:false,
      message:error.message
    })
  }
};

module.exports = {
  loginUser,
  userRegister,
  adminLogin,
};
