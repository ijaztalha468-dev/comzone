import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError(err.response?.data?.message || "Login nahi ho saka.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <form className="bg-white p-[30px] rounded-xl w-[320px] flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="text-center text-xl mb-2.5">COM-ZONE Admin</h1>

        <input
          className="p-2.5 border border-slate-300 rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-2.5 border border-slate-300 rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="p-2.5 bg-blue-600 text-white border-0 rounded-lg cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-[red] text-center text-sm">{error}</p>}
      </form>
    </div>
  );
}
