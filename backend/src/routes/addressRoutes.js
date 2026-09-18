const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
} = require("../controllers/addressController");

const router = express.Router();

// Token check yahin route file mein (req.user set karta hai) - baaki routes jaisa pattern
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

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid ya expired token",
    });
  }
};

router.get("/", protect, getAddresses);
router.post("/", protect, addAddress);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

module.exports = router;
