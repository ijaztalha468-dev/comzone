import api from "../api/axios";
import { saveProductsMirror } from "./localStorageDB";

function mapProduct(p) {
  return {
    id: p.Id,
    name: p.Name,
    description: p.Description,
    category: p.Category,
    brand: p.Brand || "",
    price: p.Price, 
    oldPrice: p.OldPrice || null,
    rating: p.Rating || 0,
    stock: p.Stock > 0,
    stockCount: p.Stock,
    image: p.ImageUrl,
    hoverImage: p.HoverImageUrl || null,
  };
}


export async function getProducts(params = {}) {
  const response = await api.get("/products", { params });
  const rawProducts = response.data?.data?.products || [];
  const products = rawProducts.map(mapProduct);

  saveProductsMirror(products);

  return products;
}


// Products page ke liye - saath mein pagination info bhi (page, totalPages waghera)
export async function getProductsPaginated(params = {}) {
  const response = await api.get("/products", { params });
  const rawProducts = response.data?.data?.products || [];
  const products = rawProducts.map(mapProduct);
  const pagination = response.data?.data?.pagination || {
    page: 1,
    limit: rawProducts.length,
    totalItems: rawProducts.length,
    totalPages: 1,
  };

  saveProductsMirror(products);

  return { products, pagination };
}


export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  const rawProduct = response.data?.data?.product;
  return rawProduct ? mapProduct(rawProduct) : null;
}
