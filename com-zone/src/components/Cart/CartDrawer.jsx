import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";

const drawerBase =
  "fixed top-0 w-screen max-w-full min-[500px]:w-[400px] min-[500px]:max-w-[90vw] h-screen bg-[var(--bg-card)] border-l border-[var(--border)] flex flex-col shadow-[-8px_0_25px_rgba(0,0,0,0.6)] z-[1300] transition-[right] duration-300 ease-in-out";

export default function CartDrawer() {

  const {
    cart,
    isCartOpen,
    closeCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleCheckout() {
    closeCart();
    navigate("/checkout");
  }

  return (
    <>

      {/* Dark overlay - click karne se drawer band ho jaye */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[1200]" onClick={closeCart} />
      )}

      <aside className={`${drawerBase} ${isCartOpen ? "right-0" : "right-[-100vw] min-[500px]:right-[-420px]"}`}>

        <div className="flex justify-between items-center py-[18px] px-[22px] bg-[var(--bg-elevated)] text-[var(--text)]">
          <h2 className="text-lg m-0">🛍️ Your Cart</h2>
          <button
            className="bg-transparent border-none text-[var(--text)] text-lg cursor-pointer w-8 h-8 rounded-full hover:bg-[var(--bg-hover)]"
            onClick={closeCart}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-[22px]">

          {cart.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-10">Aapka cart khali hai.</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3.5 border-b border-[var(--border)]">

              <img
                className="w-[60px] h-[60px] object-contain rounded-lg bg-[var(--bg-elevated-2)]"
                src={item.image}
                alt={item.name}
                loading="lazy"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-sm mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</h3>
                <p className="text-[13px] text-[var(--warning)] font-bold m-0">{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center gap-2 bg-[var(--bg-hover)] rounded-[20px] py-1 px-2">
                <button
                  className="bg-transparent border-none w-[22px] h-[22px] rounded-full cursor-pointer text-[15px] text-[var(--text)] hover:bg-[var(--bg-hover)] hover:text-[var(--red-hover)]"
                  onClick={() => decreaseQty(item.id)}
                >
                  −
                </button>
                <span className="min-w-[16px] text-center text-sm">{item.quantity}</span>
                <button
                  className="bg-transparent border-none w-[22px] h-[22px] rounded-full cursor-pointer text-[15px] text-[var(--text)] hover:bg-[var(--bg-hover)] hover:text-[var(--red-hover)]"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="bg-transparent border-none cursor-pointer text-[15px] text-[var(--text-muted)] opacity-70 hover:opacity-100 hover:text-[var(--red-hover)] hover:bg-transparent hover:shadow-none"
                onClick={() => removeFromCart(item.id)}
                title="Remove"
              >
                🗑️
              </button>

            </div>
          ))}

        </div>

        {cart.length > 0 && (
          <div className="py-[18px] px-[22px] pb-[22px] border-t border-[var(--border)]">

            <div className="flex justify-between items-center text-base font-bold mb-3.5">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              className="w-full py-3.5 border-none rounded-[10px] bg-[var(--red)] text-white text-[15px] font-bold cursor-pointer transition-[background,box-shadow] duration-200 ease-in-out hover:bg-[var(--red-hover)] hover:shadow-[var(--shadow-red)]"
              onClick={handleCheckout}
            >
              Checkout →
            </button>

          </div>
        )}

      </aside>

    </>
  );
}
