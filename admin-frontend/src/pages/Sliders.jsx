import { useEffect, useState } from "react";
import { getSlides, addSlide, editSlide, deleteSlide } from "../services/sliderService";
import { uploadImage } from "../services/uploadService";

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";
const fieldClass = "p-[9px] border border-slate-300 rounded-lg [font-family:inherit] bg-white";
const labelClass = "text-[13px] text-slate-500 mt-1.5";

const emptyForm = { title: "", text: "", imageUrl: "", linkUrl: "" };

export default function Sliders() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = add mode
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadSlides() {
    try {
      setLoading(true);
      const data = await getSlides();
      setSlides(data);
    } catch (err) {
      console.error("Admin Slides Error:", err);
      setError("Slides load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlides();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(slide) {
    setEditingId(slide.Id);
    setForm({
      title: slide.Title,
      text: slide.Text,
      imageUrl: slide.ImageUrl,
      linkUrl: slide.LinkUrl,
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
        await editSlide(editingId, form);
      } else {
        await addSlide(form);
      }

      setShowForm(false);
      loadSlides();
    } catch (err) {
      console.error("Save Slide Error:", err);
      alert(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye slide delete karna hai?");
    if (!confirmDelete) return;

    try {
      await deleteSlide(id);
      loadSlides();
    } catch (err) {
      console.error("Delete Slide Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Hero Slider</h1>
        <button onClick={openAddForm}>+ Add Slide</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100`}>Preview</th>
              <th className={`${thtd} bg-slate-100`}>Title</th>
              <th className={`${thtd} bg-slate-100`}>Text</th>
              <th className={`${thtd} bg-slate-100`}>Link</th>
              <th className={`${thtd} bg-slate-100`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((s) => (
              <tr key={s.Id}>
                <td className={thtd}><img src={s.ImageUrl} alt={s.Title} className="w-[70px] h-10 object-cover rounded-md" loading="lazy" /></td>
                <td className={thtd}>{s.Title}</td>
                <td className={thtd}>{s.Text}</td>
                <td className={thtd}>{s.LinkUrl}</td>
                <td className={thtd}>
                  <div className="flex gap-2">
                    <button className="bg-amber-500" onClick={() => openEditForm(s)}>Edit</button>
                    <button className="bg-red-500" onClick={() => handleDelete(s.Id)}>Delete</button>
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
            <h2>{editingId ? "Edit Slide" : "Add Slide"}</h2>

            <label className={labelClass}>Title</label>
            <input className={fieldClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label className={labelClass}>Text</label>
            <textarea className={fieldClass}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />

            <label className={labelClass}>Image</label>
            <input className={fieldClass}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {uploading && <p>Uploading...</p>}

            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="w-full max-h-[140px] object-cover rounded-lg mt-1.5" />
            )}

            <label className={labelClass}>Link (jahan "Shop Now" le jaye, optional)</label>
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
