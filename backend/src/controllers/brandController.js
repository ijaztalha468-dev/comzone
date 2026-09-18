const { sql, getPool } = require("../config/db");

// GET /api/brands - public
async function getBrands(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT Id, Name, ImageUrl
      FROM Brands
      ORDER BY Id
    `);

    return res.status(200).json({
      success: true,
      data: { brands: result.recordset }
    });

  } catch (error) {
    console.error("Get Brands Error:", error);
    return res.status(500).json({
      success: false,
      message: "Brands load karte waqt server error hua"
    });
  }
}

module.exports = { getBrands };
