require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authroute = require("./src/routes/authRoutes");
const productRoute = require("./src/routes/productRoutes");
const cartRoute = require("./src/routes/cartRoutes");
const orderRoute = require("./src/routes/orderRoutes");
const userRoute = require("./src/routes/userRoutes");
const sliderRoute = require("./src/routes/sliderRoutes");
const promoCardRoute = require("./src/routes/promoCardRoutes");
const subcategoryRoute = require("./src/routes/subcategoryRoutes");
const offerRoute = require("./src/routes/offerRoutes");
const brandRoute = require("./src/routes/brandRoutes");
const contactRoute = require("./src/routes/contactRoutes");
const addressRoute = require("./src/routes/addressRoutes");

const app = express();


// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// Routes
app.use("/api/auth", authroute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/slides", sliderRoute);
app.use("/api/promo-cards", promoCardRoute);
app.use("/api/subcategories", subcategoryRoute);
app.use("/api/offers", offerRoute);
app.use("/api/brands", brandRoute);
app.use("/api/contact", contactRoute);
app.use("/api/addresses", addressRoute);


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend server chal raha hai",
  });
});


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} par chal raha hai`);
});