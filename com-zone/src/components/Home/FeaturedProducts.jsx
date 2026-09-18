import { useEffect, useState } from "react";

import ProductCard from "../Product/ProductCard";
import { getProducts } from "../../services/productService";

export default function FeaturedProducts() {

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const products = await getProducts();
        setFeatured(products.slice(0, 8));
      } catch (err) {
        console.error("Load Featured Products Error:", err);
      }
    }

    loadFeatured();
  }, []);

  return (
    <section>
      <h2 className="text-center text-[32px]">Featured Products</h2>
      <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-5 gap-5">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
