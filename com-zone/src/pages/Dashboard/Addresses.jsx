import { useEffect, useState } from "react";
import { getAddresses, addAddress, editAddress, deleteAddress } from "../../services/addressService";
import { MapPin, Plus, Pencil, Trash2, Star } from "lucide-react";

const emptyForm = {
  label: "Home",
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  isDefault: false,
};

const fieldClass = "p-[9px] border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] [font-family:inherit]";
const labelClass = "text-[13px] text-[var(--text-dim)] mt-1.5";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadAddresses() {
    try {
      setLoading(true);
      const data = await getAddresses();
      setAddresses(data);
    } catch (err) {
      console.error("Get Addresses Error:", err);
      setError("Addresses load nahi ho sakin.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(addr) {
    setEditingId(addr.Id);
    setForm({
      label: addr.Label,
      fullName: addr.FullName,
      phone: addr.Phone,
      addressLine: addr.AddressLine,
      city: addr.City,
      isDefault: addr.IsDefault,
    });
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await editAddress(editingId, form);
      } else {
        await addAddress(form);
      }

      setShowForm(false);
      loadAddresses();
    } catch (err) {
      console.error("Save Address Error:", err);
      alert(err.response?.data?.message || "Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye address delete karni hai?");
    if (!confirmDelete) return;

    try {
      await deleteAddress(id);
      loadAddresses();
    } catch (err) {
      console.error("Delete Address Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div className="max-w-[900px]">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[var(--text)]">My Addresses</h1>
        <button className="flex items-center gap-1.5 bg-[var(--red)] hover:bg-[var(--red-hover)]" onClick={openAddForm}>
          <Plus size={16} /> Add New Address
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-[var(--red-hover)]">{error}</p>}

      {!loading && !error && addresses.length === 0 && (
        <div className="flex flex-col items-center gap-2.5 py-[60px] text-[var(--text-dim)]">
          <MapPin size={40} strokeWidth={1.4} />
          <p>Koi address save nahi ki abhi tak.</p>
        </div>
      )}

      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))] gap-[18px]">
        {addresses.map((addr) => (
          <div
            key={addr.Id}
            className={`relative bg-[var(--bg-card)] border rounded-2xl p-5 transition-[border-color,box-shadow,transform] duration-300 ease-in-out hover:border-[var(--red-border)] hover:shadow-[0_10px_25px_var(--red-bg)] hover:-translate-y-[3px] ${
              addr.IsDefault ? "border-[var(--red)]" : "border-[var(--border)]"
            }`}
          >

            {addr.IsDefault && (
              <span className="absolute -top-2.5 right-4 bg-[var(--red)] text-white text-[11px] font-bold py-1 px-2.5 rounded-[20px] flex items-center gap-1">
                <Star size={12} fill="currentColor" /> Default
              </span>
            )}

            <h3 className="text-[var(--red-hover)] text-[15px] mb-2">{addr.Label}</h3>
            <p className="!text-[var(--text)] font-semibold text-[var(--text-muted)] text-sm my-0.5">{addr.FullName}</p>
            <p className="text-[var(--text-muted)] text-sm my-0.5">{addr.AddressLine}</p>
            <p className="text-[var(--text-muted)] text-sm my-0.5">{addr.City}</p>
            <p className="!mt-1.5 text-[var(--text-muted)] text-sm my-0.5">{addr.Phone}</p>

            <div className="flex gap-2.5 mt-4">
              <button
                className="flex items-center gap-1 bg-[var(--border-soft)] text-[var(--text)] text-[13px] py-1.5 px-3 hover:bg-[var(--red)] hover:text-white"
                onClick={() => openEditForm(addr)}
              >
                <Pencil size={15} /> Edit
              </button>
              <button
                className="flex items-center gap-1 bg-[var(--border-soft)] text-[var(--text)] text-[13px] py-1.5 px-3 hover:bg-[var(--red-dark)] hover:text-white"
                onClick={() => handleDelete(addr.Id)}
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-[1400]">
          <form className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-[26px] w-[380px] max-h-[85vh] overflow-y-auto flex flex-col gap-2" onSubmit={handleSubmit}>
            <h2 className="text-[var(--text)] mb-2">{editingId ? "Edit Address" : "Add New Address"}</h2>

            <label className={labelClass}>Label</label>
            <select
              className={fieldClass}
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            >
              <option>Home</option>
              <option>Office</option>
              <option>Other</option>
            </select>

            <label className={labelClass}>Full Name</label>
            <input
              className={fieldClass}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />

            <label className={labelClass}>Phone</label>
            <input
              className={fieldClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />

            <label className={labelClass}>Address</label>
            <input
              className={fieldClass}
              value={form.addressLine}
              onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
              required
            />

            <label className={labelClass}>City</label>
            <input
              className={fieldClass}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />

            <label className="!flex items-center gap-2 !flex-row !text-[var(--text-muted)]">
              <input
                className="w-auto"
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              />
              Set as default address
            </label>

            <div className="flex justify-end gap-2.5 mt-3.5">
              <button type="button" className="bg-[var(--border-soft)] text-[var(--text)]" onClick={() => setShowForm(false)}>
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
