const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getPool, sql } = require("../config/db");


const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};


// POST /api/admin/auth/register
// Pehla admin banane ke liye - sirf ek dafa use karein, phir chahen to route hata dein
const adminRegister = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur password required hain"
      });
    }

    const pool = await getPool();

    const checkAdmin = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Admins WHERE Email = @email");

    if (checkAdmin.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ye admin already exist karta hai"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashPassword)
      .query(`
        INSERT INTO Admins (Name, Email, Password)
        VALUES (@name, @email, @password)
      `);

    res.status(201).json({
      success: true,
      message: "Admin account ban gaya, ab login kar sakte hain"
    });

  } catch (error) {

    console.log("Admin Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Register error"
    });

  }

};


// POST /api/admin/auth/login
const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email aur password required hain"
      });
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Admins WHERE Email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const admin = result.recordset[0];

    const match = await bcrypt.compare(password, admin.Password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.json({
      success: true,
      message: "Admin login successful",
      token: generateToken(admin.Id),
      user: {
        id: admin.Id,
        name: admin.Name,
        email: admin.Email
      }
    });

  } catch (error) {

    console.log("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login error"
    });

  }

};


module.exports = {
  adminRegister,
  adminLogin
};
