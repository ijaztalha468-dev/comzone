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


// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur password required hain"
      });
    }

    const pool = await getPool();

    const checkUser = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT * FROM Users WHERE Email = @email"
      );


    if (checkUser.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }


    const hashPassword = await bcrypt.hash(password, 10);


    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashPassword)
      .query(`
        INSERT INTO Users
        (Name, Email, Password)
        VALUES
        (@name, @email, @password);

        SELECT SCOPE_IDENTITY() AS id;
      `);


    const userId = result.recordset[0].id;


    res.status(201).json({
      success: true,
      message: "Register successful",
      token: generateToken(userId),
      user: {
        id: userId,
        name,
        email
      }
    });


  } catch (error) {

    console.log("Register Error:", error);

    res.status(500).json({
      success:false,
      message:"Register error"
    });
  }
};



// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message:"Email aur password required hain"
      });
    }


    const pool = await getPool();


    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT * FROM Users WHERE Email = @email"
      );


    if (result.recordset.length === 0) {
      return res.status(400).json({
        success:false,
        message:"Invalid email or password"
      });
    }


    const user = result.recordset[0];


    // SQL column name safe handling
    const dbPassword = user.Password || user.password;
    const userId = user.Id || user.id;


    if (!dbPassword) {
      return res.status(500).json({
        success:false,
        message:"Database password column nahi mil raha"
      });
    }


    const match = await bcrypt.compare(
      password,
      dbPassword
    );


    if (!match) {
      return res.status(400).json({
        success:false,
        message:"Invalid email or password"
      });
    }


    res.json({
      success:true,
      message:"Login successful",
      token: generateToken(userId),
      user:{
        id:userId,
        name:user.Name || user.name,
        email:user.Email || user.email
      }
    });


  } catch(error) {

    console.log("Login Error:", error);

    res.status(500).json({
      success:false,
      message:"Login error"
    });

  }

};


module.exports = {
  register,
  login
};