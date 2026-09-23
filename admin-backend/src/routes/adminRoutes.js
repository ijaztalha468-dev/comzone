const express = require("express");
const jwt = require("jsonwebtoken");
const { getPool, sql } = require("../config/db");
const { testConnection, listProducts } = require("../controllers/adminController");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock
} = require("../controllers/productAdminController");
const {
  listOrders,
  getOrderDetail,
  updateOrderStatus
} = require("../controllers/orderAdminController");
const {
  listSlides,
  createSlide,
  updateSlide,
  deleteSlide
} = require("../controllers/sliderAdminController");
const { uploadImage } = require("../controllers/uploadController");
const upload = require("../config/upload");
const { getStats } = require("../controllers/statsController");
const { listCustomers, listOrderedCustomers } = require("../controllers/customerAdminController");
const {
  listPromoCards,
  createPromoCard,
  updatePromoCard,
  deletePromoCard
} = require("../controllers/promoCardAdminController");
const {
  listSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
} = require("../controllers/subcategoryAdminController");
const {
  listOffers,
  createOffer,
  updateOffer,
  deleteOffer
} = require("../controllers/offerAdminController");
const {
  listBrands,
  createBrand,
  updateBrand,
  deleteBrand
} = require("../controllers/brandAdminController");
const { listMessages, deleteMessage } = require("../controllers/messageAdminController");

const router = express.Router();

// Token check yahin route file mein - customer backend jaisa hi pattern
const protectAdmin = async (req, res, next) => {
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

    const pool = await getPool();

    const result = await pool
      .request()
      .input("id", sql.Int, decoded.id)
      .query("SELECT Id FROM Admins WHERE Id = @id");

    if (result.recordset.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Access denied, admin nahi mila",
      });
    }

    req.admin = { id: decoded.id };
    next();
  } catch (error) {
    console.log("Admin Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid ya expired token",
    });
  }
};

router.get("/test", protectAdmin, testConnection);
router.get("/products", protectAdmin, listProducts);
router.post("/products", protectAdmin, createProduct);
router.put("/products/:id", protectAdmin, updateProduct);
router.delete("/products/:id", protectAdmin, deleteProduct);
router.patch("/products/:id/stock", protectAdmin, adjustStock);

router.get("/orders", protectAdmin, listOrders);
router.get("/orders/:id", protectAdmin, getOrderDetail);
router.patch("/orders/:id/status", protectAdmin, updateOrderStatus);

router.get("/slides", protectAdmin, listSlides);
router.post("/slides", protectAdmin, createSlide);
router.put("/slides/:id", protectAdmin, updateSlide);
router.delete("/slides/:id", protectAdmin, deleteSlide);

router.post("/upload", protectAdmin, upload.single("image"), uploadImage);

router.get("/stats", protectAdmin, getStats);

router.get("/customers", protectAdmin, listCustomers);
router.get("/customers/ordered", protectAdmin, listOrderedCustomers);

router.get("/promo-cards", protectAdmin, listPromoCards);
router.post("/promo-cards", protectAdmin, createPromoCard);
router.put("/promo-cards/:id", protectAdmin, updatePromoCard);
router.delete("/promo-cards/:id", protectAdmin, deletePromoCard);

router.get("/subcategories", protectAdmin, listSubcategories);
router.post("/subcategories", protectAdmin, createSubcategory);
router.put("/subcategories/:id", protectAdmin, updateSubcategory);
router.delete("/subcategories/:id", protectAdmin, deleteSubcategory);

router.get("/offers", protectAdmin, listOffers);
router.post("/offers", protectAdmin, createOffer);
router.put("/offers/:id", protectAdmin, updateOffer);
router.delete("/offers/:id", protectAdmin, deleteOffer);

router.get("/brands", protectAdmin, listBrands);
router.post("/brands", protectAdmin, createBrand);
router.put("/brands/:id", protectAdmin, updateBrand);
router.delete("/brands/:id", protectAdmin, deleteBrand);

router.get("/messages", protectAdmin, listMessages);
router.delete("/messages/:id", protectAdmin, deleteMessage);

module.exports = router;
