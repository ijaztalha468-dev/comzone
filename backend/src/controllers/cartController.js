const jwt = require("jsonwebtoken");
const { sql, getPool } = require("../config/db");

// ---- Cart ke liye DB functions (seedha yahin, koi alag model file nahi) ----

// User ke cart ke saare items Products ke sath join karke laata hai
async function getCartItems(userId) {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("userId", sql.Int, userId)
    .query(`
      SELECT
        ci.CartItemId,
        ci.ProductId,
        ci.Quantity,
        p.Name,
        p.Price,
        p.ImageUrl,
        p.Stock
      FROM CartItems ci
      JOIN Products p ON p.Id = ci.ProductId
      WHERE ci.UserId = @userId
      ORDER BY ci.CartItemId
    `);

  return result.recordset;
}

// Product cart mein add karta hai - agar pehle se hai to quantity badha deta hai
async function addItem(userId, productId, quantity) {
  const pool = await getPool();

  const existing = await pool
    .request()
    .input("userId", sql.Int, userId)
    .input("productId", sql.Int, productId)
    .query("SELECT CartItemId, Quantity FROM CartItems WHERE UserId = @userId AND ProductId = @productId");

  if (existing.recordset.length > 0) {
    const newQuantity = existing.recordset[0].Quantity + quantity;

    await pool
      .request()
      .input("cartItemId", sql.Int, existing.recordset[0].CartItemId)
      .input("quantity", sql.Int, newQuantity)
      .query("UPDATE CartItems SET Quantity = @quantity WHERE CartItemId = @cartItemId");
  } else {
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("productId", sql.Int, productId)
      .input("quantity", sql.Int, quantity)
      .query("INSERT INTO CartItems (UserId, ProductId, Quantity) VALUES (@userId, @productId, @quantity)");
  }
}

// Kisi item ki quantity update karta hai
async function updateItemQuantity(userId, productId, quantity) {
  const pool = await getPool();

  await pool
    .request()
    .input("userId", sql.Int, userId)
    .input("productId", sql.Int, productId)
    .input("quantity", sql.Int, quantity)
    .query("UPDATE CartItems SET Quantity = @quantity WHERE UserId = @userId AND ProductId = @productId");
}

// Cart se ek item hata deta hai
async function removeItem(userId, productId) {
  const pool = await getPool();

  await pool
    .request()
    .input("userId", sql.Int, userId)
    .input("productId", sql.Int, productId)
    .query("DELETE FROM CartItems WHERE UserId = @userId AND ProductId = @productId");
}

// User ka poora cart clear kar deta hai
async function clearCart(userId) {
  const pool = await getPool();

  await pool
    .request()
    .input("userId", sql.Int, userId)
    .query("DELETE FROM CartItems WHERE UserId = @userId");
}

// ---- Auth helper ----

// Authorization header se token nikaal kar userId return karta hai
// Token na ho ya invalid ho to null return karta hai
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

// Response ka common shape banata hai - items + summary
function buildCartResponse(items) {
  const subtotal = items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.Quantity, 0);

  return {
    items,
    summary: { subtotal, itemCount },
  };
}

// GET /api/cart
async function getCart(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    const items = await getCartItems(userId);
    return res.status(200).json({
      success: true,
      data: buildCartResponse(items),
    });
  } catch (error) {
    console.error("Get Cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Cart load karte waqt server error hua",
    });
  }
}

// POST /api/cart
async function addToCart(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId required hai",
      });
    }

    await addItem(userId, productId, quantity || 1);
    const items = await getCartItems(userId);

    return res.status(200).json({
      success: true,
      message: "Cart mein add ho gaya",
      data: buildCartResponse(items),
    });
  } catch (error) {
    console.error("Add To Cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Cart mein add karte waqt server error hua",
    });
  }
}

// PUT /api/cart/:productId
async function updateCartItem(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    const { quantity } = req.body;
    const { productId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity required hai",
      });
    }

    await updateItemQuantity(userId, productId, quantity);
    const items = await getCartItems(userId);

    return res.status(200).json({
      success: true,
      message: "Quantity update ho gayi",
      data: buildCartResponse(items),
    });
  } catch (error) {
    console.error("Update Cart Item error:", error);
    return res.status(500).json({
      success: false,
      message: "Quantity update karte waqt server error hua",
    });
  }
}

// DELETE /api/cart/:productId
async function removeCartItem(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    await removeItem(userId, req.params.productId);
    const items = await getCartItems(userId);

    return res.status(200).json({
      success: true,
      message: "Item cart se hata diya",
      data: buildCartResponse(items),
    });
  } catch (error) {
    console.error("Remove Cart Item error:", error);
    return res.status(500).json({
      success: false,
      message: "Item hataate waqt server error hua",
    });
  }
}

// DELETE /api/cart
async function clearUserCart(req, res) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Login required hai" });
    }

    await clearCart(userId);
    return res.status(200).json({
      success: true,
      message: "Cart clear ho gaya",
      data: buildCartResponse([]),
    });
  } catch (error) {
    console.error("Clear Cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Cart clear karte waqt server error hua",
    });
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearUserCart };