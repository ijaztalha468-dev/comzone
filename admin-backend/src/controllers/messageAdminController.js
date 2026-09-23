const { sql, getPool } = require("../config/db");


// GET /api/admin/messages
async function listMessages(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM ContactMessages ORDER BY CreatedAt DESC");

    return res.status(200).json({
      success: true,
      data: { messages: result.recordset }
    });
  } catch (error) {
    console.error("Admin List Messages Error:", error);
    return res.status(500).json({ success: false, message: "Messages load karte waqt server error hua" });
  }
}


// DELETE /api/admin/messages/:id
async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    const pool = await getPool();

    await pool.request().input("id", sql.Int, id).query("DELETE FROM ContactMessages WHERE Id = @id");

    return res.status(200).json({ success: true, message: "Message delete ho gaya" });
  } catch (error) {
    console.error("Delete Message Error:", error);
    return res.status(500).json({ success: false, message: "Message delete karte waqt server error hua" });
  }
}


module.exports = { listMessages, deleteMessage };
