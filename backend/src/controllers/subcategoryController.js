const { sql, getPool } = require("../config/db");

// GET /api/subcategories - saare subcategories, Navbar dropdown ke liye (public)
async function getSubcategories(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT Id, ParentCategory, Label, LinkUrl
      FROM Subcategories
      ORDER BY ParentCategory, SortOrder, Id
    `);

    return res.status(200).json({
      success: true,
      data: { subcategories: result.recordset }
    });

  } catch (error) {
    console.error("Get Subcategories Error:", error);
    return res.status(500).json({
      success: false,
      message: "Subcategories load karte waqt server error hua"
    });
  }
}

module.exports = { getSubcategories };
