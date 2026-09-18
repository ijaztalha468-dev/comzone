const express = require("express");
const { getPromoCards } = require("../controllers/promoCardController");

const router = express.Router();

router.get("/", getPromoCards);

module.exports = router;
