const { sql, getPool } = require("../config/db");
const { deleteUploadedFile } = require("../utils/fileHelper");


// GET /api/admin/brands
async function listBrands(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Brands ORDER BY Id");

    return res.status(200).json({
      success: true,
      data: { brands: result.recordset }
    });
  } catch (error) {
    console.error("Admin List Brands Error:", error);
    return res.status(500).json({ success: false, message: "Brands load karte waqt server error hua" });
  }
}


// POST /api/admin/brands
async function createBrand(req, res) {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ success: false, message: "Name aur Image required hain" });
    }

    const pool = await getPool();

    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("imageUrl", sql.NVarChar, imageUrl)
      .query(`INSERT INTO Brands (Name, ImageUrl) VALUES (@name, @imageUrl)`);

    return res.status(201).json({ success: true, message: "Brand add ho gaya" });
  } catch (error) {
    console.error("Create Brand Error:", error);
    return res.status(500).json({ success: false, message: "Brand add karte waqt server error hua" });
  }
}


// PUT /api/admin/brands/:id
async function updateBrand(req, res) {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM Brands WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Brand nahi mila" });
    }

    const oldImageUrl = existing.recordset[0].ImageUrl;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("imageUrl", sql.NVarChar, imageUrl)
      .query(`UPDATE Brands SET Name = @name, ImageUrl = @imageUrl WHERE Id = @id`);

    if (oldImageUrl && oldImageUrl !== imageUrl) {
      deleteUploadedFile(oldImageUrl);
    }

    return res.status(200).json({ success: true, message: "Brand update ho gaya" });
  } catch (error) {
    console.error("Update Brand Error:", error);
    return res.status(500).json({ success: false, message: "Brand update karte waqt server error hua" });
  }
}


// DELETE /api/admin/brands/:id
async function deleteBrand(req, res) {
  try {
    const { id } = req.params;
    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM Brands WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Brand nahi mila" });
    }

    await pool.request().input("id", sql.Int, id).query("DELETE FROM Brands WHERE Id = @id");

    deleteUploadedFile(existing.recordset[0].ImageUrl);

    return res.status(200).json({ success: true, message: "Brand delete ho gaya" });
  } catch (error) {
    console.error("Delete Brand Error:", error);
    return res.status(500).json({ success: false, message: "Brand delete karte waqt server error hua" });
  }
}


module.exports = { listBrands, createBrand, updateBrand, deleteBrand };
