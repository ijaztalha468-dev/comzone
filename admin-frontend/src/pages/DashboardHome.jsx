import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../services/statsService";
import { getOrders } from "../services/orderService";
import { getCustomers } from "../services/customerService";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Sab kuch ek sath (parallel) mangwa lete hain, aur sirf 5-5 (poori list nahi) -
        // Dashboard ko sirf preview chahiye, poori table transfer karna waste hai
        const [statsData, ordersData, customersData] = await Promise.all([
          getStats(),
          getOrders(5),
          getCustomers(5),
        ]);

        setStats(statsData);
        setRecentOrders(ordersData);
        setRecentCustomers(customersData);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="flex gap-4 mt-5">
        <div className="bg-white border-l-[5px] border-blue-600 rounded-xl py-[18px] px-6 flex flex-col min-w-[160px]">
          <span className="text-[26px] font-bold text-slate-800">{stats.totalProducts}</span>
          <span className="text-slate-500 text-sm">Total Products</span>
        </div>

        <div className="bg-white border-l-[5px] border-blue-600 rounded-xl py-[18px] px-6 flex flex-col min-w-[160px]">
          <span className="text-[26px] font-bold text-slate-800">{stats.inStock}</span>
          <span className="text-slate-500 text-sm">In Stock</span>
        </div>

        <div className="bg-white border-l-[5px] border-blue-600 rounded-xl py-[18px] px-6 flex flex-col min-w-[160px]">
          <span className="text-[26px] font-bold text-slate-800">{stats.outOfStock}</span>
          <span className="text-slate-500 text-sm">Out of Stock</span>
        </div>

        <div className="bg-white border-l-[5px] border-blue-600 rounded-xl py-[18px] px-6 flex flex-col min-w-[160px]">
          <span className="text-[26px] font-bold text-slate-800">{stats.totalUsers}</span>
          <span className="text-slate-500 text-sm">Total Users</span>
        </div>
      </div>

      <div className="flex gap-5 mt-6 flex-wrap">

        {/* Recent Orders */}
        <div className="flex-1 min-w-[300px] bg-white rounded-xl py-[18px] px-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base m-0">Recent Orders</h2>
            <Link className="text-[13px] text-blue-600 no-underline" to="/dashboard/orders">View All</Link>
          </div>

          {recentOrders.length === 0 && <p>Koi order nahi hai.</p>}

          {recentOrders.map((o) => (
            <div key={o.OrderId} className="flex justify-between py-2 border-b border-slate-100 text-sm">
              <span>#{o.OrderId} — {o.FirstName} {o.LastName}</span>
              <span>{o.Status}</span>
            </div>
          ))}
        </div>

        {/* Recent Customers */}
        <div className="flex-1 min-w-[300px] bg-white rounded-xl py-[18px] px-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base m-0">Recent Customers</h2>
            <Link className="text-[13px] text-blue-600 no-underline" to="/dashboard/customers">View All</Link>
          </div>

          {recentCustomers.length === 0 && <p>Koi customer nahi hai.</p>}

          {recentCustomers.map((c) => (
            <div key={c.Id} className="flex justify-between py-2 border-b border-slate-100 text-sm">
              <span>{c.Name}</span>
              <span>{c.Email}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
