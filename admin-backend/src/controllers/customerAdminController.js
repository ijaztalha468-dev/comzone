const { sql, getPool } = require("../config/db");


// GET /api/admin/customers - saare registered customers (Users table)
// Optional ?limit=5 - Dashboard preview ke liye poori list nahi chahiye
async function listCustomers(req, res) {

  try {

    const pool = await getPool();
    const limit = parseInt(req.query.limit) || null;

    const topClause = limit ? `TOP ${limit}` : "";

    const result = await pool.request().query(`
      SELECT ${topClause} Id, Name, Email
      FROM Users
      ORDER BY Id DESC
    `);

    return res.status(200).json({
      success: true,
      data: { customers: result.recordset }
    });

  } catch (error) {

    console.error("Admin List Customers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Customers load karte waqt server error hua"
    });

  }

}


// GET /api/admin/customers/ordered - sirf wo customers jinhone kam se kam ek order place kiya ho
async function listOrderedCustomers(req, res) {

  try {

    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT
        u.Id,
        u.Name,
        u.Email,
        COUNT(o.OrderId) AS OrderCount
      FROM Users u
      INNER JOIN Orders o ON o.UserId = u.Id
      GROUP BY u.Id, u.Name, u.Email
      ORDER BY OrderCount DESC
    `);

    return res.status(200).json({
      success: true,
      data: { customers: result.recordset }
    });

  } catch (error) {

    console.error("Admin List Ordered Customers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Customers load karte waqt server error hua"
    });

  }

}


module.exports = { listCustomers, listOrderedCustomers };
