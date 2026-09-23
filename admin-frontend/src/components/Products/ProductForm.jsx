import { useState } from "react";
import { uploadImage } from "../../services/uploadService";

// Ye customer site (Navbar/CategoryPage) ke category names se exactly match honi chahiye
const CATEGORY_OPTIONS = [
  "Laptop",
  "Desktop",
  "GPU",
  "RAM",
  "SSD",
  "HDD",
  "PSU",
  "Monitor",
  "Network",
  "Printer",
  "Accessories",
];

const emptyForm = {
  name: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  oldPrice: "",
  stock: "",
  imageUrl: "",
  hoverImageUrl: "",
};

const fieldClass = "p-[9px] border border-slate-300 rounded-lg [font-family:inherit] bg-white";
const labelClass = "text-[13px] text-slate-500 mt-1.5";

export default function ProductForm({ initialData, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState(initialData || emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFileChange(e, fieldName) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, [fieldName]: url }));
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Image upload nahi ho saka.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        stock: Number(form.stock),
      });
    } catch (err) {
      console.error("Product Form Error:", err);
      setError(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-[rgba(15,23,42,0.6)] flex justify-center items-center z-50">
      <form className="bg-white rounded-xl p-6 w-[420px] max-h-[85vh] overflow-y-auto flex flex-col gap-2" onSubmit={handleSubmit}>
        <h2>{submitLabel === "Add" ? "Add Product" : "Edit Product"}</h2>

        <label className={labelClass}>Name</label>
        <input className={fieldClass} name="name" value={form.name} onChange={handleChange} required />

        <label className={labelClass}>Description</label>
        <textarea className={fieldClass} name="description" value={form.description} onChange={handleChange} />

        <label className={labelClass}>Category</label>
        <select className={fieldClass} name="category" value={form.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label className={labelClass}>Brand</label>
        <input className={fieldClass} name="brand" value={form.brand} onChange={handleChange} />

        <div className="flex gap-3">
          <div className="flex-1 flex flex-col">
            <label className={labelClass}>Price</label>
            <input className={fieldClass} type="number" name="price" value={form.price} onChange={handleChange} required />
          </div>

          <div className="flex-1 flex flex-col">
            <label className={labelClass}>Old Price (optional)</label>
            <input className={fieldClass} type="number" name="oldPrice" value={form.oldPrice || ""} onChange={handleChange} />
          </div>
        </div>

        <label className={labelClass}>Stock</label>
        <input className={fieldClass} type="number" name="stock" value={form.stock} onChange={handleChange} required />

        <label className={labelClass}>Image (Main)</label>
        <input className={fieldClass} type="file" accept="image/*" onChange={(e) => handleFileChange(e, "imageUrl")} />

        {form.imageUrl && (
          <img src={form.imageUrl} alt="Preview" className="w-full max-h-[140px] object-cover rounded-lg mt-1.5" />
        )}

        <label className={labelClass}>Image (Hover — jo cursor le jane par dikhe)</label>
        <input className={fieldClass} type="file" accept="image/*" onChange={(e) => handleFileChange(e, "hoverImageUrl")} />

        {form.hoverImageUrl && (
          <img src={form.hoverImageUrl} alt="Hover Preview" className="w-full max-h-[140px] object-cover rounded-lg mt-1.5" />
        )}

        {uploading && <p>Uploading...</p>}

        {error && <p className="text-[red] text-[13px]">{error}</p>}

        <div className="flex justify-end gap-2.5 mt-3.5">
          <button type="button" className="bg-slate-200 text-slate-800" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" disabled={saving || uploading}>
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
