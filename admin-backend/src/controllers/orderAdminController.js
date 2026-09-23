const { sql, getPool } = require("../config/db");


// GET /api/admin/orders - SAARE users ke orders (admin ke liye)
// Optional ?limit=5 - Dashboard jaisi jagah pe sirf chand orders chahiye hote hain,
// poori table fetch karna zaroori nahi
async function listOrders(req, res) {

  try {

    const pool = await getPool();
    const limit = parseInt(req.query.limit) || null;

    const topClause = limit ? `TOP ${limit}` : "";

    const result = await pool.request().query(`
      SELECT ${topClause}
        o.OrderId, o.FirstName, o.LastName, o.Email, o.Phone,
        o.Address, o.City, o.PaymentMethod, o.TotalAmount,
        o.Status, o.CreatedAt
      FROM Orders o
      ORDER BY o.CreatedAt DESC
    `);

    return res.status(200).json({
      success: true,
      data: { orders: result.recordset }
    });

  } catch (error) {

    console.error("Admin List Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Orders load karte waqt server error hua"
    });

  }

}


// GET /api/admin/orders/:id - ek order ki poori detail (items ke sath)
async function getOrderDetail(req, res) {

  try {

    const { id } = req.params;
    const pool = await getPool();

    const orderResult = await pool
      .request()
      .input("orderId", sql.Int, id)
      .query("SELECT * FROM Orders WHERE OrderId = @orderId");

    const order = orderResult.recordset[0];

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order nahi mila"
      });
    }

    const itemsResult = await pool
      .request()
      .input("orderId", sql.Int, id)
      .query(`
        SELECT oi.ProductId, oi.Quantity, oi.Price, p.Name, p.ImageUrl
        FROM OrderItems oi
        JOIN Products p ON p.Id = oi.ProductId
        WHERE oi.OrderId = @orderId
      `);

    return res.status(200).json({
      success: true,
      data: { order, items: itemsResult.recordset }
    });

  } catch (error) {

    console.error("Admin Get Order Detail Error:", error);

    return res.status(500).json({
      success: false,
      message: "Order detail load karte waqt server error hua"
    });

  }

}


// PATCH /api/admin/orders/:id/status - order ka status badalna
// Body: { status: "Shipped" }
async function updateOrderStatus(req, res) {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status invalid hai. Allowed: " + allowedStatuses.join(", ")
      });
    }

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT OrderId FROM Orders WHERE OrderId = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order nahi mila"
      });
    }

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("status", sql.NVarChar, status)
      .query("UPDATE Orders SET Status = @status WHERE OrderId = @id");

    return res.status(200).json({
      success: true,
      message: "Order status update ho gaya"
    });

  } catch (error) {

    console.error("Admin Update Order Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Status update karte waqt server error hua"
    });

  }

}


module.exports = {
  listOrders,
  getOrderDetail,
  updateOrderStatus
};
