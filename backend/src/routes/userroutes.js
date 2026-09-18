const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/usercontroller");

const router = express.Router();

// Token check yahin route file mein (req.user set karta hai)
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token nahi mila, login karein",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id: userId }
    next();
  } catch (error) {
    console.log("Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid ya expired token",
    });
  }
};

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;