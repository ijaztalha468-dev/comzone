import { useEffect, useState } from "react";
import { getOffers, addOffer, editOffer, deleteOffer } from "../services/offerService";
import { uploadImage } from "../services/uploadService";

const emptyForm = { title: "", discount: "", imageUrl: "", linkUrl: "" };

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";
const fieldClass = "p-[9px] border border-slate-300 rounded-lg [font-family:inherit] bg-white";
const labelClass = "text-[13px] text-slate-500 mt-1.5";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadOffers() {
    try {
      setLoading(true);
      const data = await getOffers();
      setOffers(data);
    } catch (err) {
      console.error("Admin Offers Error:", err);
      setError("Offers load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(offer) {
    setEditingId(offer.Id);
    setForm({
      title: offer.Title,
      discount: offer.Discount,
      imageUrl: offer.ImageUrl,
      linkUrl: offer.LinkUrl,
    });
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
        await editOffer(editingId, form);
      } else {
        await addOffer(form);
      }
      setShowForm(false);
      loadOffers();
    } catch (err) {
      console.error("Save Offer Error:", err);
      alert(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye offer delete karna hai?");
    if (!confirmDelete) return;
    try {
      await deleteOffer(id);
      loadOffers();
    } catch (err) {
      console.error("Delete Offer Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Special Offers</h1>
        <button onClick={openAddForm}>+ Add Offer</button>
      </div>

      <p style={{ color: "#64748b", marginBottom: 16 }}>
        Ye Home page ke "Special Offers" section mein dikhte hain.
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse bg-white rounded-[10px] overflow-hidden">
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100`}>Preview</th>
              <th className={`${thtd} bg-slate-100`}>Title</th>
              <th className={`${thtd} bg-slate-100`}>Discount</th>
              <th className={`${thtd} bg-slate-100`}>Link</th>
              <th className={`${thtd} bg-slate-100`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.Id}>
                <td className={thtd}><img src={o.ImageUrl} alt={o.Title} className="w-[70px] h-10 object-cover rounded-md" loading="lazy" /></td>
                <td className={thtd}>{o.Title}</td>
                <td className={thtd}>{o.Discount}</td>
                <td className={thtd}>{o.LinkUrl}</td>
                <td className={thtd}>
                  <div className="flex gap-2">
                    <button className="bg-amber-500" onClick={() => openEditForm(o)}>Edit</button>
                    <button className="bg-red-500" onClick={() => handleDelete(o.Id)}>Delete</button>
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
            <h2>{editingId ? "Edit Offer" : "Add Offer"}</h2>

            <label className={labelClass}>Title</label>
            <input className={fieldClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />

            <label className={labelClass}>Discount Text</label>
            <input className={fieldClass} value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="Up to 30% OFF" />

            <label className={labelClass}>Image</label>
            <input className={fieldClass} type="file" accept="image/*" onChange={handleFileChange} />

            {uploading && <p>Uploading...</p>}
            {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="w-full max-h-[140px] object-cover rounded-lg mt-1.5" />}

            <label className={labelClass}>Link</label>
            <input className={fieldClass} value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} placeholder="/laptop" />

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
