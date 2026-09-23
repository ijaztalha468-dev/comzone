const { sql, getPool } = require("../config/db");
const { deleteUploadedFile } = require("../utils/fileHelper");


// GET /api/admin/slides
async function listSlides(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(
      "SELECT * FROM Slides ORDER BY Id"
    );

    return res.status(200).json({
      success: true,
      data: { slides: result.recordset }
    });

  } catch (error) {
    console.error("Admin List Slides Error:", error);
    return res.status(500).json({
      success: false,
      message: "Slides load karte waqt server error hua"
    });
  }
}


// POST /api/admin/slides
async function createSlide(req, res) {
  try {
    const { title, text, imageUrl, linkUrl } = req.body;

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
      .input("text", sql.NVarChar, text || "")
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("linkUrl", sql.NVarChar, linkUrl || "")
      .query(`
        INSERT INTO Slides (Title, Text, ImageUrl, LinkUrl)
        VALUES (@title, @text, @imageUrl, @linkUrl)
      `);

    return res.status(201).json({
      success: true,
      message: "Slide add ho gaya"
    });

  } catch (error) {
    console.error("Create Slide Error:", error);
    return res.status(500).json({
      success: false,
      message: "Slide add karte waqt server error hua"
    });
  }
}


// PUT /api/admin/slides/:id
async function updateSlide(req, res) {
  try {
    const { id } = req.params;
    const { title, text, imageUrl, linkUrl } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM Slides WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Slide nahi mila"
      });
    }

    const oldImageUrl = existing.recordset[0].ImageUrl;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("text", sql.NVarChar, text || "")
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("linkUrl", sql.NVarChar, linkUrl || "")
      .query(`
        UPDATE Slides
        SET Title = @title, Text = @text, ImageUrl = @imageUrl, LinkUrl = @linkUrl
        WHERE Id = @id
      `);

    if (oldImageUrl && oldImageUrl !== imageUrl) {
      deleteUploadedFile(oldImageUrl);
    }

    return res.status(200).json({
      success: true,
      message: "Slide update ho gaya"
    });

  } catch (error) {
    console.error("Update Slide Error:", error);
    return res.status(500).json({
      success: false,
      message: "Slide update karte waqt server error hua"
    });
  }
}


// DELETE /api/admin/slides/:id
async function deleteSlide(req, res) {
  try {
    const { id } = req.params;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl FROM Slides WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Slide nahi mila"
      });
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Slides WHERE Id = @id");

    deleteUploadedFile(existing.recordset[0].ImageUrl);

    return res.status(200).json({
      success: true,
      message: "Slide delete ho gaya"
    });

  } catch (error) {
    console.error("Delete Slide Error:", error);
    return res.status(500).json({
      success: false,
      message: "Slide delete karte waqt server error hua"
    });
  }
}


module.exports = {
  listSlides,
  createSlide,
  updateSlide,
  deleteSlide
};
