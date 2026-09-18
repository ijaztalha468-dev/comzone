import ProductCard from "./ProductCard";

export default function ProductList({ products }) {

  return (
    <div className="grid grid-cols-2 min-[900px]:grid-cols-3 gap-5">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
}