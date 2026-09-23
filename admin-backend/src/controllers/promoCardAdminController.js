const { sql, getPool } = require("../config/db");
const { deleteUploadedFile } = require("../utils/fileHelper");


// GET /api/admin/promo-cards
async function listPromoCards(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(
      "SELECT * FROM PromoCards ORDER BY Id"
    );

    return res.status(200).json({
      success: true,
      data: { promoCards: result.recordset }
    });

  } catch (error) {
    console.error("Admin List Promo Cards Error:", error);
    return res.status(500).json({
      success: false,
      message: "Promo cards load karte waqt server error hua"
    });
  }
}


// POST /api/admin/promo-cards
async function createPromoCard(req, res) {
  try {
    const { title, subtitle, imageUrl, buttonText, linkUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title aur Image URL required hain"
      });
    }

    const pool = await getPool();

    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("subtitle", sql.NVarChar, subtitle || "")
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("buttonText", sql.NVarChar, buttonText || "")
      .input("linkUrl", sql.NVarChar, linkUrl || "")
      .query(`
        INSERT INTO PromoCards (Title, Subtitle, ImageUrl, ButtonText, LinkUrl)
        VALUES (@title, @subtitle, @imageUrl, @buttonText, @linkUrl)
      `);

    return res.status(201).json({
      success: true,
      message: "Promo card add ho gaya"
    });

  } catch (error) {
    console.error("Create Promo Card Error:", error);
    return res.status(500).json({
      success: false,
      message: "Promo card add karte waqt server error hua"
    });
  }
}


// PUT /api/admin/promo-cards/:id
async function updatePromoCard(req, res) {
  try {
    const { id } = req.params;
    const { title, subtitle, imageUrl, buttonText, linkUrl } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM PromoCards WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Promo card nahi mila"
      });
    }

    const oldImageUrl = existing.recordset[0].ImageUrl;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("subtitle", sql.NVarChar, subtitle || "")
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("buttonText", sql.NVarChar, buttonText || "")
      .input("linkUrl", sql.NVarChar, linkUrl || "")
      .query(`
        UPDATE PromoCards
        SET Title = @title, Subtitle = @subtitle, ImageUrl = @imageUrl,
            ButtonText = @buttonText, LinkUrl = @linkUrl
        WHERE Id = @id
      `);

    if (oldImageUrl && oldImageUrl !== imageUrl) {
      deleteUploadedFile(oldImageUrl);
    }

    return res.status(200).json({
      success: true,
      message: "Promo card update ho gaya"
    });

  } catch (error) {
    console.error("Update Promo Card Error:", error);
    return res.status(500).json({
      success: false,
      message: "Promo card update karte waqt server error hua"
    });
  }
}


// DELETE /api/admin/promo-cards/:id
async function deletePromoCard(req, res) {
  try {
    const { id } = req.params;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM PromoCards WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Promo card nahi mila"
      });
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM PromoCards WHERE Id = @id");

    deleteUploadedFile(existing.recordset[0].ImageUrl);

    return res.status(200).json({
      success: true,
      message: "Promo card delete ho gaya"
    });

  } catch (error) {
    console.error("Delete Promo Card Error:", error);
    return res.status(500).json({
      success: false,
      message: "Promo card delete karte waqt server error hua"
    });
  }
}


module.exports = {
  listPromoCards,
  createPromoCard,
  updatePromoCard,
  deletePromoCard
};
