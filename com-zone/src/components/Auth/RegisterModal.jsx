import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick
}) {

  const { register } = useAuth();
  const { loadCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password match nahi ho raha");
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      await loadCart();
      onClose();
    } else {
      setError(result.message || "Registration failed. Try again.");
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.55)] z-[9999]" onClick={onClose}>
      <div className="w-[95%] min-[480px]:w-full max-w-[420px] bg-[var(--bg-card)] rounded-xl p-[22px] min-[480px]:p-[30px] relative shadow-[0_10px_30px_rgba(0,0,0,0.2)]" onClick={(e) => e.stopPropagation()}>

        <button className="absolute top-[15px] right-[18px] border-none bg-transparent text-2xl cursor-pointer" type="button" onClick={onClose}>×</button>

        <h2 className="text-center mb-[25px] text-[var(--text)]">Create Account</h2>

        {error && <p>{error}</p>}

        <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>

          <div className="flex items-center gap-2.5 w-full py-0 px-[14px] border border-[var(--border)] rounded-lg transition-colors duration-300 ease-in-out focus-within:border-[var(--red)]">
            <span className="text-xl">👤</span>
            <input
              className="w-full py-[14px] px-0 border-none outline-none text-[15px]"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2.5 w-full py-0 px-[14px] border border-[var(--border)] rounded-lg transition-colors duration-300 ease-in-out focus-within:border-[var(--red)]">
            <span className="text-xl">📧</span>
            <input
              className="w-full py-[14px] px-0 border-none outline-none text-[15px]"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2.5 w-full py-0 px-[14px] border border-[var(--border)] rounded-lg transition-colors duration-300 ease-in-out focus-within:border-[var(--red)]">
            <span className="text-xl">🔒</span>
            <input
              className="w-full py-[14px] px-0 border-none outline-none text-[15px]"
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2.5 w-full py-0 px-[14px] border border-[var(--border)] rounded-lg transition-colors duration-300 ease-in-out focus-within:border-[var(--red)]">
            <span className="text-xl">🔐</span>
            <input
              className="w-full py-[14px] px-0 border-none outline-none text-[15px]"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="border-none py-[14px] rounded-lg bg-[var(--red)] text-white text-base font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[var(--red-dark)]" disabled={loading}>
            {loading ? "Creating account..." : "📝 Register"}
          </button>

        </form>

        <p className="text-center mt-[18px] text-sm">
          Already have an account?
          <span className="text-[var(--red)] cursor-pointer font-semibold" onClick={onLoginClick}> 🔐 Login</span>
        </p>

      </div>
    </div>
  );
}
