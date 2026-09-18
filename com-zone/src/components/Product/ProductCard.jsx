import { useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFlyToCart } from "../../context/FlyToCartContext";
import { formatPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();
  const { flyToCart } = useFlyToCart();

  const imageRef = useRef(null);

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  function handleAddToCart() {
    flyToCart(product.image, imageRef.current);
    addToCart(product);
  }

  return (
    <div className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 transition-[transform,box-shadow] duration-300 ease-in-out text-[gray] hover:-translate-y-[5px] hover:shadow-[var(--shadow-red)]">

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="relative block w-full h-[170px] overflow-hidden">

        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 bg-[var(--red)] text-white text-xs font-bold py-1 px-2.5 rounded-md z-[2]">
            {discountPercent}% Off
          </span>
        )}

        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-[170px] object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />

        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.name}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-[170px] object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
          />
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col pt-1">

        <h3 className="text-base mt-2 mb-0.5 mx-0">
          {product.name}
        </h3>

        <p>
          Brand: {product.brand}
        </p>

        <div className="text-[var(--warning)] text-[13px] tracking-[2px] my-0.5">
          {"★".repeat(Math.round(product.rating || 0))}
          {"☆".repeat(5 - Math.round(product.rating || 0))}
        </div>

        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h4 className="text-[var(--text)] text-xl font-bold m-0">
            {formatPrice(product.price)}
          </h4>

          {hasDiscount && (
            <span className="text-[var(--text-muted)] text-sm line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          className="w-full mt-2.5 bg-[var(--red)] text-[var(--bg)] border-none py-3 rounded-lg font-bold cursor-pointer transition-colors duration-[250ms] ease-in-out hover:bg-[var(--red-hover)]"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

        <Link
          to={`/product/${product.id}`}
          className="block text-center mt-2.5 text-[var(--success)]"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}
