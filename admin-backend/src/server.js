require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Uploaded images (slides, product images waghera) yahan se serve hoti hain
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/admin/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Admin backend chal raha hai: http://localhost:${PORT}`);
});
