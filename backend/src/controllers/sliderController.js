const { sql, getPool } = require("../config/db");

// GET /api/slides - Home page ke hero slider ke liye (public)
async function getSlides(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT Id, Title, Text, ImageUrl, LinkUrl
      FROM Slides
      ORDER BY Id
    `);

    return res.status(200).json({
      success: true,
      data: { slides: result.recordset }
    });

  } catch (error) {
    console.error("Get Slides Error:", error);
    return res.status(500).json({
      success: false,
      message: "Slides load karte waqt server error hua"
    });
  }
}

module.exports = { getSlides };
