import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderDetail } from "../services/orderService";

const boxThtd = "text-left p-2.5 border-b border-slate-200";

export default function OrderDetail() {
  const { id } = useParams();

  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const data = await getOrderDetail(id);
        setOrderData(data);
      } catch (err) {
        console.error("Admin Order Detail Error:", err);
        setError("Order detail load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-[red]">{error}</p>;
  }

  const { order, items } = orderData;

  return (
    <div>
      <div className="flex justify-between items-center mb-[18px]">
        <h1>Order #{order.OrderId}</h1>
        <Link className="text-blue-600 no-underline text-sm" to="/dashboard/orders">← Back to Orders</Link>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">

        {/* Customer ki detail */}
        <div className="bg-white rounded-[10px] py-[18px] px-5 flex-1 min-w-[260px]">
          <h2 className="text-[15px] mt-0 mb-2.5">Customer</h2>
          <p className="my-1.5 text-sm"><strong>Name:</strong> {order.FirstName} {order.LastName}</p>
          <p className="my-1.5 text-sm"><strong>Email:</strong> {order.Email}</p>
          <p className="my-1.5 text-sm"><strong>Phone:</strong> {order.Phone}</p>
          <p className="my-1.5 text-sm"><strong>Address:</strong> {order.Address}, {order.City}</p>
        </div>

        {/* Order ki detail */}
        <div className="bg-white rounded-[10px] py-[18px] px-5 flex-1 min-w-[260px]">
          <h2 className="text-[15px] mt-0 mb-2.5">Order Info</h2>
          <p className="my-1.5 text-sm"><strong>Status:</strong> {order.Status}</p>
          <p className="my-1.5 text-sm"><strong>Payment Method:</strong> {order.PaymentMethod}</p>
          <p className="my-1.5 text-sm"><strong>Date:</strong> {new Date(order.CreatedAt).toLocaleString()}</p>
          <p className="my-1.5 text-sm"><strong>Total:</strong> Rs. {order.TotalAmount}</p>
        </div>

      </div>

      {/* Order ke items */}
      <div className="bg-white rounded-[10px] py-[18px] px-5">
        <h2 className="text-[15px] mt-0 mb-2.5">Items</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${boxThtd} bg-slate-100 text-[13px] text-slate-500`}>Product</th>
              <th className={`${boxThtd} bg-slate-100 text-[13px] text-slate-500`}>Quantity</th>
              <th className={`${boxThtd} bg-slate-100 text-[13px] text-slate-500`}>Price</th>
              <th className={`${boxThtd} bg-slate-100 text-[13px] text-slate-500`}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ProductId}>
                <td className={boxThtd}>{item.Name}</td>
                <td className={boxThtd}>{item.Quantity}</td>
                <td className={boxThtd}>Rs. {item.Price}</td>
                <td className={boxThtd}>Rs. {item.Price * item.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
