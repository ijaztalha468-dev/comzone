import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserOrders } from "../../services/orderService";
import { formatPrice } from "../../utils/helpers";

const cardBase = "border rounded-lg p-4 cursor-pointer";
const cardNormal = `${cardBase} border-[var(--border)] hover:border-[var(--red)] hover:bg-[var(--bg-elevated-2)]`;
const cardHighlighted = `${cardBase} border-[var(--success)] bg-[var(--success-bg)]`;

export default function MyOrders() {
  const location = useLocation();
  const navigate = useNavigate();
  const successOrderId = location.state?.successOrderId; // Checkout se aaya hua (agar abhi order place hua ho)

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const result = await getUserOrders();
        setOrders(result.data.orders);
      } catch (err) {
        console.error("Get User Orders Error:", err);
        setError(err.response?.data?.message || "Orders load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="max-w-[700px]">
      <h1>My Orders</h1>

      {/* Abhi order place hua ho to yeh banner dikhega */}
      {successOrderId && (
        <div className="bg-[var(--success-bg)] text-[var(--success)] p-4 rounded-lg mb-6 text-center">
          <strong>Order Successful!</strong> Aapka order (ID: {successOrderId}) place ho gaya hai.
        </div>
      )}

      {loading && <p>Loading...</p>}

      {error && <p className="text-[var(--danger)]">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>Aapne abhi tak koi order place nahi kiya.</p>
      )}

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.OrderId}
            className={
              successOrderId && order.OrderId === successOrderId ? cardHighlighted : cardNormal
            }
            onClick={() => navigate(`/dashboard/orders/detail/${order.OrderId}`)}
          >
            <p><strong>Order ID:</strong> {order.OrderId}</p>
            <p><strong>Date:</strong> {new Date(order.CreatedAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {order.Status}</p>
            <p><strong>Total:</strong> {formatPrice(order.TotalAmount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
