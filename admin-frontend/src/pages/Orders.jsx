import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../services/orderService";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const thtd = "text-left px-3.5 py-3 border-b border-slate-200";

const statusColor = {
  processing: "text-amber-700",
  shipped: "text-blue-600",
  delivered: "text-green-600",
  cancelled: "text-red-600",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Admin Orders Error:", err);
      setError("Orders load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(orderId, status) {
    try {
      await updateOrderStatus(orderId, status);
      loadOrders();
    } catch (err) {
      console.error("Update Status Error:", err);
      alert("Status update nahi ho saka.");
    }
  }

  return (
    <div>
      <h1 className="mb-[18px]">Orders</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-[red]">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse bg-white rounded-[10px] overflow-hidden">
          <thead>
            <tr>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Order Id</th>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Customer</th>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Status</th>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Date</th>
              <th className={`${thtd} bg-slate-100 text-[13px] uppercase text-slate-500`}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.OrderId} className="hover:bg-slate-50">
                <td className={thtd}>{o.OrderId}</td>
                <td className={thtd}>{o.FirstName} {o.LastName}</td>
                <td className={thtd}>
                  <select
                    value={o.Status}
                    className={`py-1.5 px-2.5 border border-slate-300 rounded-md text-[13px] cursor-pointer bg-white ${statusColor[o.Status.toLowerCase()] || ""}`}
                    onChange={(e) => handleStatusChange(o.OrderId, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className={thtd}>{new Date(o.CreatedAt).toLocaleDateString()}</td>
                <td className={thtd}>
                  <Link to={`/dashboard/orders/${o.OrderId}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
