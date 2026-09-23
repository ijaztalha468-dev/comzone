const { sql, getPool } = require("../config/db");


// GET /api/admin/stats - Dashboard ke liye simple counts
async function getStats(req, res) {

  try {

    const pool = await getPool();

    const productsResult = await pool.request().query(`
      SELECT
        COUNT(*) AS totalProducts,
        SUM(CASE WHEN Stock > 0 THEN 1 ELSE 0 END) AS inStock,
        SUM(CASE WHEN Stock = 0 THEN 1 ELSE 0 END) AS outOfStock
      FROM Products
    `);

    const usersResult = await pool.request().query(`
      SELECT COUNT(*) AS totalUsers FROM Users
    `);

    return res.status(200).json({
      success: true,
      data: {
        totalProducts: productsResult.recordset[0].totalProducts,
        inStock: productsResult.recordset[0].inStock,
        outOfStock: productsResult.recordset[0].outOfStock,
        totalUsers: usersResult.recordset[0].totalUsers
      }
    });

  } catch (error) {

    console.error("Get Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Stats load karte waqt server error hua"
    });

  }

}


module.exports = { getStats };
