const { getPool, sql } = require("../config/db");


// GET /api/addresses - login user ki saari addresses
async function getAddresses(req, res) {
  try {
    const userId = req.user.id;
    const pool = await getPool();

    const result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(`
        SELECT Id, Label, FullName, Phone, AddressLine, City, IsDefault
        FROM Addresses
        WHERE UserId = @userId
        ORDER BY IsDefault DESC, Id DESC
      `);

    return res.status(200).json({
      success: true,
      data: { addresses: result.recordset }
    });

  } catch (error) {
    console.error("Get Addresses Error:", error);
    return res.status(500).json({
      success: false,
      message: "Addresses load karte waqt server error hua"
    });
  }
}


// POST /api/addresses - nayi address add karna
async function addAddress(req, res) {
  try {
    const userId = req.user.id;
    const { label, fullName, phone, addressLine, city, isDefault } = req.body;

    if (!label || !fullName || !phone || !addressLine || !city) {
      return res.status(400).json({
        success: false,
        message: "Saari fields required hain"
      });
    }

    const pool = await getPool();

    // Agar ye default set ho rahi hai, to purani sab ki default hata do
    if (isDefault) {
      await pool
        .request()
        .input("userId", sql.Int, userId)
        .query("UPDATE Addresses SET IsDefault = 0 WHERE UserId = @userId");
    }

    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("label", sql.NVarChar, label)
      .input("fullName", sql.NVarChar, fullName)
      .input("phone", sql.NVarChar, phone)
      .input("addressLine", sql.NVarChar, addressLine)
      .input("city", sql.NVarChar, city)
      .input("isDefault", sql.Bit, isDefault ? 1 : 0)
      .query(`
        INSERT INTO Addresses (UserId, Label, FullName, Phone, AddressLine, City, IsDefault)
        VALUES (@userId, @label, @fullName, @phone, @addressLine, @city, @isDefault)
      `);

    return res.status(201).json({
      success: true,
      message: "Address add ho gayi"
    });

  } catch (error) {
    console.error("Add Address Error:", error);
    return res.status(500).json({
      success: false,
      message: "Address add karte waqt server error hua"
    });
  }
}


// PUT /api/addresses/:id
async function updateAddress(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { label, fullName, phone, addressLine, city, isDefault } = req.body;

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .query("SELECT Id FROM Addresses WHERE Id = @id AND UserId = @userId");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Address nahi mili"
      });
    }

    if (isDefault) {
      await pool
        .request()
        .input("userId", sql.Int, userId)
        .query("UPDATE Addresses SET IsDefault = 0 WHERE UserId = @userId");
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("label", sql.NVarChar, label)
      .input("fullName", sql.NVarChar, fullName)
      .input("phone", sql.NVarChar, phone)
      .input("addressLine", sql.NVarChar, addressLine)
      .input("city", sql.NVarChar, city)
      .input("isDefault", sql.Bit, isDefault ? 1 : 0)
      .query(`
        UPDATE Addresses
        SET Label = @label, FullName = @fullName, Phone = @phone,
            AddressLine = @addressLine, City = @city, IsDefault = @isDefault
        WHERE Id = @id
      `);

    return res.status(200).json({
      success: true,
      message: "Address update ho gayi"
    });

  } catch (error) {
    console.error("Update Address Error:", error);
    return res.status(500).json({
      success: false,
      message: "Address update karte waqt server error hua"
    });
  }
}


// DELETE /api/addresses/:id
async function deleteAddress(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const pool = await getPool();

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .query("DELETE FROM Addresses WHERE Id = @id AND UserId = @userId");

    return res.status(200).json({
      success: true,
      message: "Address delete ho gayi"
    });

  } catch (error) {
    console.error("Delete Address Error:", error);
    return res.status(500).json({
      success: false,
      message: "Address delete karte waqt server error hua"
    });
  }
}


module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };
