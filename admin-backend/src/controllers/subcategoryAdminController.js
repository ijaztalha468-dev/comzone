const { sql, getPool } = require("../config/db");


// GET /api/admin/subcategories
async function listSubcategories(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(
      "SELECT * FROM Subcategories ORDER BY ParentCategory, SortOrder, Id"
    );

    return res.status(200).json({
      success: true,
      data: { subcategories: result.recordset }
    });

  } catch (error) {
    console.error("Admin List Subcategories Error:", error);
    return res.status(500).json({
      success: false,
      message: "Subcategories load karte waqt server error hua"
    });
  }
}


// POST /api/admin/subcategories
async function createSubcategory(req, res) {
  try {
    const { parentCategory, label, linkUrl, sortOrder } = req.body;

    if (!parentCategory || !label || !linkUrl) {
      return res.status(400).json({
        success: false,
        message: "Parent Category, Label aur Link required hain"
      });
    }

    const pool = await getPool();

    await pool
      .request()
      .input("parentCategory", sql.NVarChar, parentCategory)
      .input("label", sql.NVarChar, label)
      .input("linkUrl", sql.NVarChar, linkUrl)
      .input("sortOrder", sql.Int, sortOrder || 0)
      .query(`
        INSERT INTO Subcategories (ParentCategory, Label, LinkUrl, SortOrder)
        VALUES (@parentCategory, @label, @linkUrl, @sortOrder)
      `);

    return res.status(201).json({
      success: true,
      message: "Subcategory add ho gayi"
    });

  } catch (error) {
    console.error("Create Subcategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Subcategory add karte waqt server error hua"
    });
  }
}


// PUT /api/admin/subcategories/:id
async function updateSubcategory(req, res) {
  try {
    const { id } = req.params;
    const { parentCategory, label, linkUrl, sortOrder } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id FROM Subcategories WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subcategory nahi mili"
      });
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("parentCategory", sql.NVarChar, parentCategory)
      .input("label", sql.NVarChar, label)
      .input("linkUrl", sql.NVarChar, linkUrl)
      .input("sortOrder", sql.Int, sortOrder || 0)
      .query(`
        UPDATE Subcategories
        SET ParentCategory = @parentCategory, Label = @label,
            LinkUrl = @linkUrl, SortOrder = @sortOrder
        WHERE Id = @id
      `);

    return res.status(200).json({
      success: true,
      message: "Subcategory update ho gayi"
    });

  } catch (error) {
    console.error("Update Subcategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Subcategory update karte waqt server error hua"
    });
  }
}


// DELETE /api/admin/subcategories/:id
async function deleteSubcategory(req, res) {
  try {
    const { id } = req.params;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id FROM Subcategories WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subcategory nahi mili"
      });
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Subcategories WHERE Id = @id");

    return res.status(200).json({
      success: true,
      message: "Subcategory delete ho gayi"
    });

  } catch (error) {
    console.error("Delete Subcategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Subcategory delete karte waqt server error hua"
    });
  }
}


module.exports = {
  listSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
};
