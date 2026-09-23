import { useEffect, useState } from "react";
import { getSubcategories, addSubcategory, editSubcategory, deleteSubcategory } from "../services/subcategoryService";

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";
const fieldClass = "p-[9px] border border-slate-300 rounded-lg [font-family:inherit] bg-white";
const labelClass = "text-[13px] text-slate-500 mt-1.5";

const PARENT_OPTIONS = ["Products", "Laptop", "Desktop", "GPU", "RAM", "SSD", "Accessories"];

const emptyForm = { parentCategory: "RAM", label: "", linkUrl: "", sortOrder: 0 };

export default function Subcategories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await getSubcategories();
      setItems(data);
    } catch (err) {
      console.error("Admin Subcategories Error:", err);
      setError("Subcategories load nahi ho sakin.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(item) {
    setEditingId(item.Id);
    setForm({
      parentCategory: item.ParentCategory,
      label: item.Label,
      linkUrl: item.LinkUrl,
      sortOrder: item.SortOrder,
    });
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await editSubcategory(editingId, form);
      } else {
        await addSubcategory(form);
      }

      setShowForm(false);
      loadItems();
    } catch (err) {
      console.error("Save Subcategory Error:", err);
      alert(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye subcategory delete karni hai?");
    if (!confirmDelete) return;

    try {
      await deleteSubcategory(id);
      loadItems();
    } catch (err) {
      console.error("Delete Subcategory Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Subcategories</h1>
        <button onClick={openAddForm}>+ Add Subcategory</button>
      </div>

      <p style={{ color: "#64748b", marginBottom: 16 }}>
        Ye items Navbar mein us category ke naam par hover karne par dropdown mein dikhte hain
        (jaise RAM \u2192 "Desktop - DDR5 Memory").
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100`}>Parent Category</th>
              <th className={`${thtd} bg-slate-100`}>Label</th>
              <th className={`${thtd} bg-slate-100`}>Link</th>
              <th className={`${thtd} bg-slate-100`}>Order</th>
              <th className={`${thtd} bg-slate-100`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.Id}>
                <td className={thtd}>{item.ParentCategory}</td>
                <td className={thtd}>{item.Label}</td>
                <td className={thtd}>{item.LinkUrl}</td>
                <td className={thtd}>{item.SortOrder}</td>
                <td className={thtd}>
                  <div className="flex gap-2">
                    <button className="bg-amber-500" onClick={() => openEditForm(item)}>Edit</button>
                    <button className="bg-red-500" onClick={() => handleDelete(item.Id)}>Delete</button>
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
            <h2>{editingId ? "Edit Subcategory" : "Add Subcategory"}</h2>

            <label className={labelClass}>Parent Category (Navbar mein konsa link)</label>
            <select className={fieldClass}
              value={form.parentCategory}
              onChange={(e) => setForm({ ...form, parentCategory: e.target.value })}
            >
              {PARENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label className={labelClass}>Label (dropdown mein jo text dikhega)</label>
            <input className={fieldClass}
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Desktop - DDR5 Memory"
              required
            />

            <label className={labelClass}>Link</label>
            <input className={fieldClass}
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              placeholder="/ram?type=ddr5-desktop"
              required
            />

            <label className={labelClass}>Order (chhota number pehle dikhega)</label>
            <input className={fieldClass}
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />

            <div className="flex justify-end gap-2.5 mt-3.5">
              <button type="button" className="bg-slate-200 text-slate-800" onClick={() => setShowForm(false)}>
                Cancel
              </button>

              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
