const express = require("express");
const { getOffers } = require("../controllers/offerController");

const router = express.Router();
router.get("/", getOffers);
module.exports = router;
