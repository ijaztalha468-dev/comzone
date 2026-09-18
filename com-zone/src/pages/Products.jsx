import { useEffect, useState } from "react";

import { getProductsPaginated } from "../services/productService";

import Filter from "../components/Product/Filter";
import ProductList from "../components/Product/ProductList";
import Pagination from "../components/Product/Pagination";


export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
  });

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalItems: 0,
    totalPages: 1,
  });

  // Filter (category/brand) badalte hi page 1 par wapas
  useEffect(() => {
    setPage(1);
  }, [filters.category, filters.brand]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const { products: data, pagination: paginationData } = await getProductsPaginated({
          category: filters.category || undefined,
          brand: filters.brand || undefined,
          page,
          limit: 12,
        });

        setProducts(data);
        setPagination(paginationData);
      } catch (err) {
        console.error("Load Products Error:", err);
        setError("Products load nahi ho sake. Backend chal raha hai check karein.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [filters.category, filters.brand, page]);

  // Price + Availability abhi backend pagination support nahi karta,
  // isliye jo current page ke products aaye hain unhi par apply hota hai
  const filteredProducts = products.filter((product) => {
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const matchesPrice = product.price >= min && product.price <= max;

    const matchesAvailability =
      filters.availability === "" ||
      (filters.availability === "In Stock" && product.stock) ||
      (filters.availability === "Out of Stock" && !product.stock);

    return matchesPrice && matchesAvailability;
  });

  return (
    <div className="w-[90%] max-w-[1200px] mx-auto py-10">

      <h1>All Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 min-[900px]:grid-cols-[250px_1fr] gap-[30px]">
            <Filter filters={filters} setFilters={setFilters} />
            <ProductList products={filteredProducts} />
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}

    </div>
  );
}
