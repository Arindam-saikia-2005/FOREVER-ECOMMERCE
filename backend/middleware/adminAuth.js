const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized Login again",
      });
    }
    next();
  } catch (error) {
    console.log("Error in admin Auth middleware", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = adminAuth;
