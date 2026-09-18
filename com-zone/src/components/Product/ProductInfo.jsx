import { useRef } from "react";
import { useCart } from "../../context/CartContext";
import { useFlyToCart } from "../../context/FlyToCartContext";
import { formatPrice } from "../../utils/helpers";

export default function ProductInfo({ product }) {

  const { addToCart } = useCart();
  const { flyToCart } = useFlyToCart();

  const btnRef = useRef(null);

  function handleAddToCart() {
    flyToCart(product.image, btnRef.current);
    addToCart(product);
  }

  return (
    <div className="bg-[var(--bg-card)] p-[30px] rounded-[10px]">

      <h1>
        {product.name}
      </h1>

      <p>
        Brand: {product.brand}
      </p>

      <p>
        ⭐ {product.rating} Rating
      </p>

      <h2>
        {formatPrice(product.price)}
      </h2>

      <p>
        {product.description}
      </p>

      <p>
        {
          product.stock
          ? "In Stock"
          : "Out of Stock"
        }
      </p>

      <button
        ref={btnRef}
        className="w-full mt-5 bg-[var(--red)] text-[var(--bg)] border-none py-3 rounded-lg font-bold cursor-pointer transition-colors duration-[250ms] ease-in-out hover:bg-[var(--red-hover)] disabled:bg-[var(--bg-hover)] disabled:text-[var(--text-dim)] disabled:cursor-not-allowed"
        onClick={handleAddToCart}
        disabled={!product.stock}
      >
        Add To Cart
      </button>

    </div>
  );
}
