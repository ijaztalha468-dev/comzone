import { useEffect, useState } from "react";
import { getBrands, addBrand, editBrand, deleteBrand } from "../services/brandService";
import { uploadImage } from "../services/uploadService";

const emptyForm = { name: "", imageUrl: "" };

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";
const fieldClass = "p-[9px] border border-slate-300 rounded-lg [font-family:inherit] bg-white";
const labelClass = "text-[13px] text-slate-500 mt-1.5";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadBrands() {
    try {
      setLoading(true);
      const data = await getBrands();
      setBrands(data);
    } catch (err) {
      console.error("Admin Brands Error:", err);
      setError("Brands load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBrands();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(brand) {
    setEditingId(brand.Id);
    setForm({ name: brand.Name, imageUrl: brand.ImageUrl });
    setShowForm(true);
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Image upload nahi ho saka.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await editBrand(editingId, form);
      } else {
        await addBrand(form);
      }
      setShowForm(false);
      loadBrands();
    } catch (err) {
      console.error("Save Brand Error:", err);
      alert(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye brand delete karna hai?");
    if (!confirmDelete) return;
    try {
      await deleteBrand(id);
      loadBrands();
    } catch (err) {
      console.error("Delete Brand Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Top Brands</h1>
        <button onClick={openAddForm}>+ Add Brand</button>
      </div>

      <p style={{ color: "#64748b", marginBottom: 16 }}>
        Ye Home page ke "Top Brands" section mein dikhte hain.
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse bg-white rounded-[10px] overflow-hidden">
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100`}>Preview</th>
              <th className={`${thtd} bg-slate-100`}>Name</th>
              <th className={`${thtd} bg-slate-100`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.Id}>
                <td className={thtd}><img src={b.ImageUrl} alt={b.Name} className="w-[70px] h-10 object-cover rounded-md" loading="lazy" /></td>
                <td className={thtd}>{b.Name}</td>
                <td className={thtd}>
                  <div className="flex gap-2">
                    <button className="bg-amber-500" onClick={() => openEditForm(b)}>Edit</button>
                    <button className="bg-red-500" onClick={() => handleDelete(b.Id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[rgba(15,23,42,0.6)] flex justify-center items-center z-50">
          <form className="bg-white rounded-xl p-6 w-[420px] max-h-[85vh] overflow-y-auto flex flex-col gap-2" onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit Brand" : "Add Brand"}</h2>

            <label className={labelClass}>Name</label>
            <input className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

            <label className={labelClass}>Logo Image</label>
            <input className={fieldClass} type="file" accept="image/*" onChange={handleFileChange} />

            {uploading && <p>Uploading...</p>}
            {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="w-full max-h-[140px] object-cover rounded-lg mt-1.5" />}

            <div className="flex justify-end gap-2.5 mt-3.5">
              <button type="button" className="bg-slate-200 text-slate-800" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" disabled={saving || uploading || !form.imageUrl}>
                {saving ? "Saving..." : editingId ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
