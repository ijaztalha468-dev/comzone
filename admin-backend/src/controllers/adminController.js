const { sql, getPool } = require("../config/db");


// GET /api/admin/test - sirf ye confirm karta hai connection ban gaya
async function testConnection(req, res) {

  try {

    const pool = await getPool();

    const result = await pool.request().query("SELECT GETDATE() AS serverTime");

    return res.status(200).json({
      success: true,
      message: "Admin backend database se connected hai",
      serverTime: result.recordset[0].serverTime
    });

  } catch (error) {

    console.error("Admin DB Test Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection fail hua"
    });

  }

}


// GET /api/admin/products - customer backend jaisa hi Products table, isse pata chalta hai SAME data mil raha hai
async function listProducts(req, res) {

  try {

    const pool = await getPool();

    const result = await pool.request().query("SELECT * FROM Products ORDER BY Id");

    return res.status(200).json({
      success: true,
      data: {
        products: result.recordset
      }
    });

  } catch (error) {

    console.error("Admin List Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Products load karte waqt server error hua"
    });

  }

}


module.exports = {
  testConnection,
  listProducts
};
