const express = require("express");
const { getSlides } = require("../controllers/sliderController");

const router = express.Router();

router.get("/", getSlides);

module.exports = router;
