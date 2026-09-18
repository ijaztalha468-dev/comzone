import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";

export default function CartItem({ item }) {

  const {
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-[10px] flex flex-col items-start min-[900px]:flex-row min-[900px]:items-center gap-5">

      {/* Image */}
      <img
        className="w-[120px] h-[120px] object-contain"
        src={item.image}
        alt={item.name}
        loading="lazy"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col items-start text-left">

        <h3 className="mb-2.5">
          {item.name}
        </h3>

        <p className="text-[var(--success)] text-lg">
          {formatPrice(item.price)}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-[15px] my-[15px]">

          <button
            className="w-[35px] h-[35px] p-0 bg-[var(--bg-elevated-2)] border border-[var(--border)] text-[var(--text)] font-bold hover:border-[var(--red-border)] hover:text-[var(--red-hover)] hover:bg-[var(--bg-elevated-2)] hover:shadow-none"
            onClick={() => decreaseQty(item.id)}
          >
            -
          </button>

          <span className="text-lg">
            {item.quantity}
          </span>

          <button
            className="w-[35px] h-[35px] p-0 bg-[var(--bg-elevated-2)] border border-[var(--border)] text-[var(--text)] font-bold hover:border-[var(--red-border)] hover:text-[var(--red-hover)] hover:bg-[var(--bg-elevated-2)] hover:shadow-none"
            onClick={() => increaseQty(item.id)}
          >
            +
          </button>

        </div>

        <button
          className="bg-transparent text-[var(--text-muted)] py-1.5 px-0 text-[13px] font-medium hover:text-[var(--red-hover)] hover:bg-transparent hover:shadow-none"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>

      </div>

    </div>
  );
}
