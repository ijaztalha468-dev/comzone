import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { calculateTotal, formatPrice } from "../../utils/helpers";

export default function CartSummary() {

  const { cart } = useCart();

  const totalPrice = calculateTotal(cart);

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[25px] rounded-[10px] h-fit">

      <h2 className="mb-5">
        Cart Summary
      </h2>

      <p>
        Total Items: {totalItems}
      </p>

      <h3 className="text-[var(--success)] my-5">
        Total Price: {formatPrice(totalPrice)}
      </h3>

      <Link to="/checkout">
        <button className="w-full">
          Proceed To Checkout
        </button>
      </Link>

    </div>
  );
}
