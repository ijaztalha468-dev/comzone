const { sql, getPool } = require("../config/db");
const { deleteUploadedFile } = require("../utils/fileHelper");


// GET /api/admin/offers
async function listOffers(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Offers ORDER BY Id");

    return res.status(200).json({
      success: true,
      data: { offers: result.recordset }
    });
  } catch (error) {
    console.error("Admin List Offers Error:", error);
    return res.status(500).json({ success: false, message: "Offers load karte waqt server error hua" });
  }
}


// POST /api/admin/offers
async function createOffer(req, res) {
  try {
    const { title, discount, imageUrl, linkUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ success: false, message: "Title aur Image required hain" });
    }

    const pool = await getPool();

    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("discount", sql.NVarChar, discount || "")
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("linkUrl", sql.NVarChar, linkUrl || "")
      .query(`
        INSERT INTO Offers (Title, Discount, ImageUrl, LinkUrl)
        VALUES (@title, @discount, @imageUrl, @linkUrl)
      `);

    return res.status(201).json({ success: true, message: "Offer add ho gaya" });
  } catch (error) {
    console.error("Create Offer Error:", error);
    return res.status(500).json({ success: false, message: "Offer add karte waqt server error hua" });
  }
}


// PUT /api/admin/offers/:id
async function updateOffer(req, res) {
  try {
    const { id } = req.params;
    const { title, discount, imageUrl, linkUrl } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM Offers WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Offer nahi mila" });
    }

    const oldImageUrl = existing.recordset[0].ImageUrl;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("discount", sql.NVarChar, discount || "")
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("linkUrl", sql.NVarChar, linkUrl || "")
      .query(`
        UPDATE Offers
        SET Title = @title, Discount = @discount, ImageUrl = @imageUrl, LinkUrl = @linkUrl
        WHERE Id = @id
      `);

    if (oldImageUrl && oldImageUrl !== imageUrl) {
      deleteUploadedFile(oldImageUrl);
    }

    return res.status(200).json({ success: true, message: "Offer update ho gaya" });
  } catch (error) {
    console.error("Update Offer Error:", error);
    return res.status(500).json({ success: false, message: "Offer update karte waqt server error hua" });
  }
}


// DELETE /api/admin/offers/:id
async function deleteOffer(req, res) {
  try {
    const { id } = req.params;
    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM Offers WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Offer nahi mila" });
    }

    await pool.request().input("id", sql.Int, id).query("DELETE FROM Offers WHERE Id = @id");

    deleteUploadedFile(existing.recordset[0].ImageUrl);

    return res.status(200).json({ success: true, message: "Offer delete ho gaya" });
  } catch (error) {
    console.error("Delete Offer Error:", error);
    return res.status(500).json({ success: false, message: "Offer delete karte waqt server error hua" });
  }
}


module.exports = { listOffers, createOffer, updateOffer, deleteOffer };
