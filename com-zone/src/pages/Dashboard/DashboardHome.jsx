import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileservice";
import { getUserOrders } from "../../services/orderService";
import { formatPrice } from "../../utils/helpers";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const profileResult = await getProfile();
        setUser(profileResult.user);

        const ordersResult = await getUserOrders();
        setOrders(ordersResult.data.orders);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <h2 className="h-[60vh] flex justify-center items-center text-[var(--red)]">Loading...</h2>;
  }

  // Stats calculate karte hain jo orders list mil chuki hai usi se
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.TotalAmount, 0);

  return (
    <div>
      <h1>Welcome, {user.Name}</h1>
      <p className="text-[var(--text-muted)] mb-6">{user.Email}</p>

      {/* Stats Cards - Total Orders aur Total Spent */}
      <div className="flex gap-4">
        <div className="flex-1 max-w-[220px] bg-[var(--bg-elevated-2)] border-l-[5px] border-[var(--red)] rounded-xl p-[18px] flex flex-col">
          <span className="text-[26px] font-bold text-[var(--text)]">{totalOrders}</span>
          <span className="text-[var(--text-muted)] text-sm">Total Orders</span>
        </div>

        <div className="flex-1 max-w-[220px] bg-[var(--bg-elevated-2)] border-l-[5px] border-[var(--red)] rounded-xl p-[18px] flex flex-col">
          <span className="text-[26px] font-bold text-[var(--text)]">{formatPrice(totalSpent)}</span>
          <span className="text-[var(--text-muted)] text-sm">Total Spent</span>
        </div>
      </div>
    </div>
  );
}
