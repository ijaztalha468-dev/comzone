import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder, getUserOrders } from "../../services/orderService";
import { formatPrice } from "../../utils/helpers";

export default function OrderDetail() {
  const { orderId } = useParams(); // agar sidebar se aaye (koi ID nahi) to undefined hoga

  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      setLoading(true);
      setError("");

      try {
        let idToLoad = orderId;

        // Koi specific order ID nahi di gayi (sidebar se seedha "Order Detail" click hua)
        // to sabse recent order load kar dete hain
        if (!idToLoad) {
          const listResult = await getUserOrders();
          const orders = listResult.data.orders;

          if (orders.length === 0) {
            setError("Abhi tak koi order nahi hai.");
            setLoading(false);
            return;
          }

          const sorted = [...orders].sort(
            (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
          );

          idToLoad = sorted[0].OrderId;
        }

        const result = await getOrder(idToLoad);
        setOrderData(result.data);
      } catch (err) {
        console.error("Get Order Detail Error:", err);
        setError(err.response?.data?.message || "Order detail load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return <h2 className="h-[60vh] flex justify-center items-center text-[var(--red)]">Loading...</h2>;
  }

  if (error) {
    return <h3 className="text-[var(--danger)]">{error}</h3>;
  }

  const { order, items } = orderData;

  return (
    <div className="max-w-[700px]">
      <h1>Order Detail</h1>

      <div className="border border-[var(--border)] rounded-[10px] p-5">
        <h3>Order Status: {order.Status}</h3>

        <p><strong>Order ID:</strong> {order.OrderId}</p>
        <p><strong>Name:</strong> {order.FirstName} {order.LastName}</p>
        <p><strong>Phone:</strong> {order.Phone}</p>
        <p><strong>Address:</strong> {order.Address}, {order.City}</p>
        <p><strong>Payment Method:</strong> {order.PaymentMethod}</p>

        <hr />

        <h4>Items</h4>

        {items.map((item) => (
          <div key={item.ProductId} className="py-1.5">
            <p><strong>{item.Name}</strong></p>
            <p>Quantity: {item.Quantity}</p>
            <p>Price: {formatPrice(item.Price * item.Quantity)}</p>
            <hr />
          </div>
        ))}

        <h3>Total: {formatPrice(order.TotalAmount)}</h3>
      </div>
    </div>
  );
}
