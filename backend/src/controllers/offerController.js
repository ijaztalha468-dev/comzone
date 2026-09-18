const { sql, getPool } = require("../config/db");

// GET /api/offers - public
async function getOffers(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT Id, Title, Discount, ImageUrl, LinkUrl
      FROM Offers
      ORDER BY Id
    `);

    return res.status(200).json({
      success: true,
      data: { offers: result.recordset }
    });

  } catch (error) {
    console.error("Get Offers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Offers load karte waqt server error hua"
    });
  }
}

module.exports = { getOffers };
