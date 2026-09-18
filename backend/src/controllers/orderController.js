const jwt = require("jsonwebtoken");
const { sql, getPool } = require("../config/db");

// Authorization header se token nikaal kar userId return karta hai
// (cartController.js mein bhi yahi function hai)
function getUserIdFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

// User ke cart ke items nikalta hai (Products ke sath join karke)
async function getCartItemsForOrder(pool, userId) {
  const result = await pool
    .request()
    .input("userId", sql.Int, userId)
    .query(`
      SELECT ci.ProductId, ci.Quantity, p.Price, p.Stock
      FROM CartItems ci
      JOIN Products p ON p.Id = ci.ProductId
      WHERE ci.UserId = @userId
    `);
  return result.recordset;
}

// POST /api/orders
async function createOrder(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    const {
      firstName, lastName, email, phone,
      address, city, paymentMethod
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !address || !city || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Saari billing details required hain"
      });
    }

    const pool = await getPool();

    const cartItems = await getCartItemsForOrder(pool, userId);

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart khali hai, order place nahi ho sakta"
      });
    }

    // Total hum yahan backend par khud calculate karte hain -
    // frontend se bheja hua total kabhi trust nahi karte (koi bhi
    // request ke andar total change karke bhej sakta hai)
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.Price * item.Quantity,
      0
    );

    const orderResult = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("firstName", sql.NVarChar, firstName)
      .input("lastName", sql.NVarChar, lastName)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone)
      .input("address", sql.NVarChar, address)
      .input("city", sql.NVarChar, city)
      .input("paymentMethod", sql.NVarChar, paymentMethod)
      .input("totalAmount", sql.Decimal(12, 2), totalAmount)
      .query(`
        INSERT INTO Orders
        (UserId, FirstName, LastName, Email, Phone, Address, City, PaymentMethod, TotalAmount)
        VALUES
        (@userId, @firstName, @lastName, @email, @phone, @address, @city, @paymentMethod, @totalAmount);

        SELECT SCOPE_IDENTITY() AS OrderId;
      `);

    const orderId = orderResult.recordset[0].OrderId;

    // Har cart item ko OrderItems mein insert karna
    for (const item of cartItems) {
      await pool
        .request()
        .input("orderId", sql.Int, orderId)
        .input("productId", sql.Int, item.ProductId)
        .input("quantity", sql.Int, item.Quantity)
        .input("price", sql.Decimal(12, 2), item.Price)
        .query(`
          INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
          VALUES (@orderId, @productId, @quantity, @price)
        `);
    }

    // Order ban gaya, ab cart clear kar dete hain
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("DELETE FROM CartItems WHERE UserId = @userId");

    return res.status(201).json({
      success: true,
      message: "Order place ho gaya",
      data: { orderId, totalAmount }
    });

  } catch (error) {
    console.error("Create Order error:", error);
    return res.status(500).json({
      success: false,
      message: "Order place karte waqt server error hua"
    });
  }
}

// GET /api/orders — login user ke saare orders (list)
async function getUserOrders(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(`
        SELECT OrderId, TotalAmount, Status, CreatedAt
        FROM Orders
        WHERE UserId = @userId
        ORDER BY CreatedAt DESC
      `);

    return res.status(200).json({
      success: true,
      data: { orders: result.recordset }
    });

  } catch (error) {
    console.error("Get User Orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Orders load karte waqt server error hua"
    });
  }
}

// GET /api/orders/:id — ek order ki poori detail (items ke sath)
async function getOrderById(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    const pool = await getPool();
    const orderId = req.params.id;

    const orderResult = await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .input("userId", sql.Int, userId)
      .query(`
        SELECT * FROM Orders
        WHERE OrderId = @orderId AND UserId = @userId
      `);

    const order = orderResult.recordset[0];

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order nahi mila"
      });
    }

    const itemsResult = await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .query(`
        SELECT oi.ProductId, oi.Quantity, oi.Price, p.Name, p.ImageUrl
        FROM OrderItems oi
        JOIN Products p ON p.Id = oi.ProductId
        WHERE oi.OrderId = @orderId
      `);

    return res.status(200).json({
      success: true,
      data: {
        order,
        items: itemsResult.recordset
      }
    });

  } catch (error) {
    console.error("Get Order By Id error:", error);
    return res.status(500).json({
      success: false,
      message: "Order load karte waqt server error hua"
    });
  }
}

module.exports = { createOrder, getUserOrders, getOrderById };