import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick
}) {

  const { login } = useAuth();
  const { loadCart } = useCart();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      await loadCart();
      onClose();
    } else {
      setError(result.message || "Invalid Email or Password");
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.55)] z-[9999]" onClick={onClose}>
      <div
        className="w-[95%] min-[480px]:w-full max-w-[420px] bg-[var(--bg-card)] rounded-xl p-[22px] min-[480px]:p-[30px] relative shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >

        <button className="absolute top-[15px] right-[18px] border-none bg-transparent text-2xl cursor-pointer" type="button" onClick={onClose}>×</button>

        <h2 className="text-center mb-[25px] text-[var(--text)]">Login</h2>

        {error && <p>{error}</p>}

        <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>

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
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="border-none py-[14px] rounded-lg bg-[var(--red)] text-white text-base font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[var(--red-dark)]"
            disabled={loading}
          >
            {loading ? "Logging in..." : "🔐 Login"}
          </button>

        </form>

        <p className="text-center mt-[18px] text-sm">
          Don't have an account?
          <span
            className="text-[var(--red)] cursor-pointer font-semibold"
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
          >
            {" "}📝 Register
          </span>
        </p>

      </div>
    </div>
  );
}
