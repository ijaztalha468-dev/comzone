import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/productService";

import ProductGallery from "../components/Product/ProductGallery";
import ProductInfo from "../components/Product/ProductInfo";


export default function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Load Product Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="w-[90%] max-w-[1200px] mx-auto py-10 grid grid-cols-1 min-[900px]:grid-cols-2 gap-10">
      <ProductGallery images={[product.image]} />
      <ProductInfo product={product} />
    </div>
  );
}
