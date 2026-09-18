import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { getProducts } from "../../services/productService";

// Ek hi component jo Laptop/Desktop/GPU/RAM/SSD/Accessories sab pages
// use karte hain - backend se category ke hisaab se products laata hai
export default function CategoryPage({ category, title, subtitle }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts({ category });
        if (isMounted) setProducts(data);
      } catch (err) {
        console.error(`Load ${category} Products Error:`, err);
        if (isMounted) {
          setError("Products load nahi ho sake. Backend chal raha hai check karein.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [category]);

  // Brand + Price + Stock Status - teeno hi client-side is category ke products par apply hote hain
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      filters.brand === "" || product.brand === filters.brand;

    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const matchesPrice = product.price >= min && product.price <= max;

    const matchesAvailability =
      filters.availability === "" ||
      (filters.availability === "In Stock" && product.stock) ||
      (filters.availability === "Out of Stock" && !product.stock);

    return matchesBrand && matchesPrice && matchesAvailability;
  });

  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[250px_1fr] gap-[30px]">

        <div className="ml-[30px]">
        <Filter
        filters={filters}
        setFilters={setFilters}
        showCategory={false}
        />
</div>

          {filteredProducts.length === 0 ? (
            <p>Is category mein abhi koi product available nahi hai.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
