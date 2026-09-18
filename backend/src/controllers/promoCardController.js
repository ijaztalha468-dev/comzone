const { sql, getPool } = require("../config/db");

// GET /api/promo-cards - Home page ke side promo cards ke liye (public)
async function getPromoCards(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT Id, Title, Subtitle, ImageUrl, ButtonText, LinkUrl
      FROM PromoCards
      ORDER BY Id
    `);

    return res.status(200).json({
      success: true,
      data: { promoCards: result.recordset }
    });

  } catch (error) {
    console.error("Get Promo Cards Error:", error);
    return res.status(500).json({
      success: false,
      message: "Promo cards load karte waqt server error hua"
    });
  }
}

module.exports = { getPromoCards };
