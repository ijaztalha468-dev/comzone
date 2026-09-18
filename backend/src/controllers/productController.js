const { sql, getPool } = require("../config/db");


// GET /api/products
// Optional query params: ?category=Laptop&brand=ASUS&page=1&limit=12
async function listProducts(req, res) {
  try {
    const pool = await getPool();
    const { category, brand } = req.query;

    // Pagination params
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 12, 1);
    const offset = (page - 1) * limit;

    const buildRequest = () => {
      const request = pool.request();
      const conditions = [];

      if (category) {
        request.input("category", sql.NVarChar, category);
        conditions.push("Category = @category");
      }

      if (brand) {
        request.input("brand", sql.NVarChar, brand);
        conditions.push("Brand = @brand");
      }

      const whereClause = conditions.length
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

      return { request, whereClause };
    };

    // Total count (pagination info ke liye)
    const { request: countRequest, whereClause: countWhere } = buildRequest();
    const countResult = await countRequest.query(
      `SELECT COUNT(*) AS total FROM Products ${countWhere}`
    );
    const totalItems = countResult.recordset[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // Actual page ka data
    const { request: dataRequest, whereClause: dataWhere } = buildRequest();
    dataRequest.input("offset", sql.Int, offset);
    dataRequest.input("limit", sql.Int, limit);

    const result = await dataRequest.query(`
      SELECT * FROM Products
      ${dataWhere}
      ORDER BY Id
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `);

    return res.status(200).json({
      success: true,
      data: {
        products: result.recordset,
        pagination: {
          page,
          limit,
          totalItems,
          totalPages
        }
      }
    });

  } catch (error) {

    console.error("Products error:", error);

    return res.status(500).json({
      success: false,
      message: "Products load karte waqt server error hua"
    });
  }
}


// GET /api/products/:id
async function getProduct(req, res) {

  try {

    const pool = await getPool();

    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(
        "SELECT * FROM Products WHERE Id = @id"
      );


    const product = result.recordset[0];


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product nahi mila"
      });
    }


    return res.status(200).json({
      success: true,
      data: {
        product
      }
    });


  } catch (error) {

    console.error("Product detail error:", error);

    return res.status(500).json({
      success:false,
      message:"Product load karte waqt server error hua"
    });

  }
}



module.exports = {
  listProducts,
  getProduct
};