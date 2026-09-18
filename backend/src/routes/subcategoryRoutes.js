const express = require("express");
const { getSubcategories } = require("../controllers/subcategoryController");

const router = express.Router();

router.get("/", getSubcategories);

module.exports = router;
