const { sql, getPool } = require("../config/db");

// POST /api/contact - public, message save karta hai
async function sendMessage(req, res) {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur message required hain"
      });
    }

    const pool = await getPool();

    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone || "")
      .input("message", sql.NVarChar, message)
      .query(`
        INSERT INTO ContactMessages (Name, Email, Phone, Message)
        VALUES (@name, @email, @phone, @message)
      `);

    return res.status(201).json({
      success: true,
      message: "Message bhej diya gaya, hum jald hi contact karenge"
    });

  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Message bhejte waqt server error hua"
    });
  }
}

module.exports = { sendMessage };
