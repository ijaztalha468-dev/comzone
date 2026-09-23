import { useEffect, useState } from "react";
import { getCustomers } from "../services/customerService";

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (err) {
        console.error("Admin Customers Error:", err);
        setError("Customers load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  return (
    <div>
      <h1 className="mb-[18px]">Customers</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-[red]">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse bg-white rounded-[10px] overflow-hidden">
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Id</th>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Name</th>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.Id} className="hover:bg-slate-50">
                <td className={thtd}>{c.Id}</td>
                <td className={thtd}>{c.Name}</td>
                <td className={thtd}>{c.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
