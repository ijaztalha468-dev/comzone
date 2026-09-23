const { sql, getPool } = require("../config/db");
const { deleteUploadedFile } = require("../utils/fileHelper");


// POST /api/admin/products - naya product add karna
async function createProduct(req, res) {

  try {

    const {
      name, description, category, brand,
      price, oldPrice, stock, imageUrl, hoverImageUrl
    } = req.body;

    if (!name || !category || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price aur stock required hain"
      });
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("description", sql.NVarChar, description || "")
      .input("category", sql.NVarChar, category)
      .input("brand", sql.NVarChar, brand || "")
      .input("price", sql.Decimal(12, 2), price)
      .input("oldPrice", sql.Decimal(12, 2), oldPrice || null)
      .input("stock", sql.Int, stock)
      .input("imageUrl", sql.NVarChar, imageUrl || "")
      .input("hoverImageUrl", sql.NVarChar, hoverImageUrl || "")
      .query(`
        INSERT INTO Products
        (Name, Description, Category, Brand, Price, OldPrice, Stock, ImageUrl, HoverImageUrl)
        VALUES
        (@name, @description, @category, @brand, @price, @oldPrice, @stock, @imageUrl, @hoverImageUrl);

        SELECT SCOPE_IDENTITY() AS Id;
      `);

    return res.status(201).json({
      success: true,
      message: "Product add ho gaya",
      data: { id: result.recordset[0].Id }
    });

  } catch (error) {

    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Product add karte waqt server error hua"
    });

  }

}


// PUT /api/admin/products/:id - product edit karna
async function updateProduct(req, res) {

  try {

    const { id } = req.params;

    const {
      name, description, category, brand,
      price, oldPrice, stock, imageUrl, hoverImageUrl
    } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl, HoverImageUrl FROM Products WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product nahi mila"
      });
    }

    const oldImageUrl = existing.recordset[0].ImageUrl;
    const oldHoverImageUrl = existing.recordset[0].HoverImageUrl;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("description", sql.NVarChar, description || "")
      .input("category", sql.NVarChar, category)
      .input("brand", sql.NVarChar, brand || "")
      .input("price", sql.Decimal(12, 2), price)
      .input("oldPrice", sql.Decimal(12, 2), oldPrice || null)
      .input("stock", sql.Int, stock)
      .input("imageUrl", sql.NVarChar, imageUrl || "")
      .input("hoverImageUrl", sql.NVarChar, hoverImageUrl || "")
      .query(`
        UPDATE Products
        SET
          Name = @name,
          Description = @description,
          Category = @category,
          Brand = @brand,
          Price = @price,
          OldPrice = @oldPrice,
          Stock = @stock,
          ImageUrl = @imageUrl,
          HoverImageUrl = @hoverImageUrl
        WHERE Id = @id
      `);

    // Agar nayi image upload hui ho (URL badal gaya ho), to purani file disk se hata do
    if (oldImageUrl && oldImageUrl !== imageUrl) {
      deleteUploadedFile(oldImageUrl);
    }

    if (oldHoverImageUrl && oldHoverImageUrl !== hoverImageUrl) {
      deleteUploadedFile(oldHoverImageUrl);
    }

    return res.status(200).json({
      success: true,
      message: "Product update ho gaya"
    });

  } catch (error) {

    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Product update karte waqt server error hua"
    });

  }

}


// DELETE /api/admin/products/:id
async function deleteProduct(req, res) {

  try {

    const { id } = req.params;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Id, ImageUrl, HoverImageUrl FROM Products WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product nahi mila"
      });
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Products WHERE Id = @id");

    // Dono images (Main + Hover) disk se hata do
    deleteUploadedFile(existing.recordset[0].ImageUrl);
    deleteUploadedFile(existing.recordset[0].HoverImageUrl);

    return res.status(200).json({
      success: true,
      message: "Product delete ho gaya"
    });

  } catch (error) {

    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Product delete karte waqt server error hua"
    });

  }

}


// PATCH /api/admin/products/:id/stock - stock +/- karna
// Body: { change: 1 } stock +1, { change: -1 } stock -1
async function adjustStock(req, res) {

  try {

    const { id } = req.params;
    const { change } = req.body;

    if (change === undefined) {
      return res.status(400).json({
        success: false,
        message: "'change' value required hai (jaise 1 ya -1)"
      });
    }

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT Stock FROM Products WHERE Id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product nahi mila"
      });
    }

    const currentStock = existing.recordset[0].Stock;
    const newStock = Math.max(currentStock + change, 0); // negative mein nahi jaega

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("stock", sql.Int, newStock)
      .query("UPDATE Products SET Stock = @stock WHERE Id = @id");

    return res.status(200).json({
      success: true,
      message: "Stock update ho gaya",
      data: { stock: newStock }
    });

  } catch (error) {

    console.error("Adjust Stock Error:", error);

    return res.status(500).json({
      success: false,
      message: "Stock update karte waqt server error hua"
    });

  }

}


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock
};
