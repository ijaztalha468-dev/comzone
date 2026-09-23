import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  adjustStock,
} from "../services/productService";
import ProductForm from "../components/Products/ProductForm";

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // jo product edit ho raha hai

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Admin Products Error:", err);
      setError("Admin backend se connect nahi ho saka. Backend chal raha hai check karein.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleAdd(formData) {
    await addProduct(formData);
    setShowAddForm(false);
    loadProducts();
  }

  async function handleEdit(formData) {
    await editProduct(editingProduct.Id, formData);
    setEditingProduct(null);
    loadProducts();
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye product delete karna hai?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  async function handleStockChange(id, change) {
    try {
      await adjustStock(id, change);
      loadProducts();
    } catch (err) {
      console.error("Stock Error:", err);
      alert("Stock update nahi ho saka.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Products (Admin)</h1>
        <button onClick={() => setShowAddForm(true)}>+ Add Product</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse bg-white rounded-[10px] overflow-hidden">
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100`}>Id</th>
              <th className={`${thtd} bg-slate-100`}>Name</th>
              <th className={`${thtd} bg-slate-100`}>Category</th>
              <th className={`${thtd} bg-slate-100`}>Brand</th>
              <th className={`${thtd} bg-slate-100`}>Price</th>
              <th className={`${thtd} bg-slate-100`}>Stock</th>
              <th className={`${thtd} bg-slate-100`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.Id}>
                <td className={thtd}>{p.Id}</td>
                <td className={thtd}>{p.Name}</td>
                <td className={thtd}>{p.Category}</td>
                <td className={thtd}>{p.Brand}</td>
                <td className={thtd}>Rs. {p.Price}</td>
                <td className={thtd}>
                  <div className="flex items-center gap-2">
                    <button className="px-2.5 py-0.5 text-sm" onClick={() => handleStockChange(p.Id, -1)}>-</button>
                    <span>{p.Stock}</span>
                    <button className="px-2.5 py-0.5 text-sm" onClick={() => handleStockChange(p.Id, 1)}>+</button>
                  </div>
                </td>
                <td className={thtd}>
                  <div className="flex gap-2">
                    <button
                      className="bg-amber-500"
                      onClick={() =>
                        setEditingProduct({
                          Id: p.Id,
                          name: p.Name,
                          description: p.Description,
                          category: p.Category,
                          brand: p.Brand,
                          price: p.Price,
                          oldPrice: p.OldPrice,
                          stock: p.Stock,
                          imageUrl: p.ImageUrl,
                          hoverImageUrl: p.HoverImageUrl,
                        })
                      }
                    >
                      Edit
                    </button>

                    <button className="bg-red-500" onClick={() => handleDelete(p.Id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddForm && (
        <ProductForm
          submitLabel="Add"
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          submitLabel="Save"
          initialData={editingProduct}
          onSubmit={handleEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
