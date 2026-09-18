import { useCart } from "../../context/CartContext";

export default function FloatingCartButton() {

  const { cart, toggleCart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <button
      className="fixed bottom-[71px] right-4 w-[50px] h-[50px] text-xl sm:bottom-[87px] sm:right-6 sm:w-[58px] sm:h-[58px] sm:text-2xl bg-[var(--bg-elevated-2)] text-[var(--text)] border border-[var(--border)] rounded-full flex items-center justify-center shadow-[var(--shadow-md)] z-[1000] cursor-pointer transition-transform duration-[250ms] ease-in-out hover:scale-[1.08] hover:bg-[var(--bg-hover)]"
      onClick={toggleCart}
      aria-label="Open cart"
    >
      🛒

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[var(--red)] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
          {cartCount}
        </span>
      )}
    </button>
  );
}
