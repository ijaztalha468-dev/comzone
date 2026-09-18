import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getProducts } from "../../services/productService";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState(null);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // Products backend se sirf pehli baar laate hain, phir cache use karte hain
    let productList = allProducts;

    if (!productList) {
      try {
        productList = await getProducts();
        setAllProducts(productList);
      } catch (err) {
        console.error("Search Products Error:", err);
        return;
      }
    }

    const filtered = productList.filter(
      (item) =>
        item.name?.toLowerCase().includes(value.toLowerCase()) ||
        item.category?.toLowerCase().includes(value.toLowerCase()) ||
        item.brand?.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  const openProduct = (id) => {
    navigate(`/product/${id}`);

    setSearch("");
    setResults([]);
  };

  return (
    <div className="relative">
      <form
        className="hidden min-[600px]:flex min-[600px]:order-3 min-[600px]:w-full min-[600px]:mt-[15px] min-[900px]:order-none min-[900px]:w-[420px] min-[900px]:mt-0 items-center h-[45px] border-2 border-[var(--red)] rounded-[25px] overflow-hidden bg-[var(--bg-card)] transition-shadow duration-[250ms] ease-in-out focus-within:shadow-[0_0_0_3px_var(--red-bg)]"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 w-full h-full border-none outline-none py-0 px-[15px] text-[15px] bg-transparent text-[var(--text)] placeholder:text-[var(--text-dim)]"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleChange}
        />

        <button
          className="w-[55px] min-[600px]:w-[60px] h-full flex items-center justify-center border-none bg-[var(--red)] text-white cursor-pointer transition-[filter,transform] duration-200 ease-in-out hover:brightness-90 active:scale-95"
          type="submit"
          aria-label="Search"
        >
          <Search size={20} className="w-5 h-5 [stroke-width:2.5]" />
        </button>
      </form>

      {results.length > 0 && (
        <div className="absolute top-[50px] left-0 w-full min-[600px]:w-[420px] max-h-[400px] overflow-y-auto bg-[var(--bg-card)] rounded-[10px] shadow-[0_5px_20px_rgba(0,0,0,0.15)] z-[1000] py-1.5 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[var(--border)] [&::-webkit-scrollbar-thumb]:rounded-[10px]">
          {results.map((product) => (
            <div
              className="flex items-center gap-[15px] p-2.5 cursor-pointer border-b border-[var(--border)] transition-colors duration-200 ease-in-out last:border-b-0 hover:bg-[var(--bg-elevated-2)]"
              key={product.id}
              onClick={() => openProduct(product.id)}
            >
              <img className="w-[50px] h-[50px] object-cover rounded-[5px] shrink-0" src={product.image} alt={product.name} />

              <div>
                <h4 className="m-0 text-[15px] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h4>
                <p className="mt-1.5 mx-0 mb-0 text-[var(--red)] text-sm font-semibold">Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
