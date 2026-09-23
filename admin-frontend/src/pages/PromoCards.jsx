import { useEffect, useState } from "react";
import { getPromoCards, addPromoCard, editPromoCard, deletePromoCard } from "../services/promoCardService";
import { uploadImage } from "../services/uploadService";

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";
const fieldClass = "p-[9px] border border-slate-300 rounded-lg [font-family:inherit] bg-white";
const labelClass = "text-[13px] text-slate-500 mt-1.5";

const emptyForm = { title: "", subtitle: "", imageUrl: "", buttonText: "", linkUrl: "" };

export default function PromoCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadCards() {
    try {
      setLoading(true);
      const data = await getPromoCards();
      setCards(data);
    } catch (err) {
      console.error("Admin Promo Cards Error:", err);
      setError("Promo cards load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(card) {
    setEditingId(card.Id);
    setForm({
      title: card.Title,
      subtitle: card.Subtitle,
      imageUrl: card.ImageUrl,
      buttonText: card.ButtonText,
      linkUrl: card.LinkUrl,
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
        await editPromoCard(editingId, form);
      } else {
        await addPromoCard(form);
      }

      setShowForm(false);
      loadCards();
    } catch (err) {
      console.error("Save Promo Card Error:", err);
      alert(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye promo card delete karna hai?");
    if (!confirmDelete) return;

    try {
      await deletePromoCard(id);
      loadCards();
    } catch (err) {
      console.error("Delete Promo Card Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Promo Cards</h1>
        <button onClick={openAddForm}>+ Add Promo Card</button>
      </div>

      <p style={{ color: "#64748b", marginBottom: 16 }}>
        Ye cards Home page par Hero Slider ke saath side mein dikhte hain (jaise "Used Laptops" / "SteelSeries" jaisi boxes).
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100`}>Preview</th>
              <th className={`${thtd} bg-slate-100`}>Title</th>
              <th className={`${thtd} bg-slate-100`}>Subtitle</th>
              <th className={`${thtd} bg-slate-100`}>Button</th>
              <th className={`${thtd} bg-slate-100`}>Link</th>
              <th className={`${thtd} bg-slate-100`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((c) => (
              <tr key={c.Id}>
                <td className={thtd}><img src={c.ImageUrl} alt={c.Title} className="w-[70px] h-10 object-cover rounded-md" loading="lazy" /></td>
                <td className={thtd}>{c.Title}</td>
                <td className={thtd}>{c.Subtitle}</td>
                <td className={thtd}>{c.ButtonText}</td>
                <td className={thtd}>{c.LinkUrl}</td>
                <td className={thtd}>
                  <div className="flex gap-2">
                    <button className="bg-amber-500" onClick={() => openEditForm(c)}>Edit</button>
                    <button className="bg-red-500" onClick={() => handleDelete(c.Id)}>Delete</button>
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
            <h2>{editingId ? "Edit Promo Card" : "Add Promo Card"}</h2>

            <label className={labelClass}>Title</label>
            <input className={fieldClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label className={labelClass}>Subtitle</label>
            <input className={fieldClass}
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />

            <label className={labelClass}>Image</label>
            <input className={fieldClass} type="file" accept="image/*" onChange={handleFileChange} />

            {uploading && <p>Uploading...</p>}

            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="w-full max-h-[140px] object-cover rounded-lg mt-1.5" />
            )}

            <label className={labelClass}>Button Text</label>
            <input className={fieldClass}
              value={form.buttonText}
              onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
              placeholder="See Offers"
            />

            <label className={labelClass}>Link</label>
            <input className={fieldClass}
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              placeholder="/products"
            />

            <div className="flex justify-end gap-2.5 mt-3.5">
              <button type="button" className="bg-slate-200 text-slate-800" onClick={() => setShowForm(false)}>
                Cancel
              </button>

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
