import { useState } from "react";

export default function Filter({
  filters,
  setFilters,
  showCategory = true,
  showBrand = true,
  showPrice = true,
  showAvailability = true,
}) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);

  const [minPriceInput, setMinPriceInput] = useState(filters.minPrice || "");
  const [maxPriceInput, setMaxPriceInput] = useState(filters.maxPrice || "");

  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const applyPrice = () => {
    setFilters({
      ...filters,
      minPrice: minPriceInput,
      maxPrice: maxPriceInput,
    });
  };

  return (
    <div className="w-full [font-family:Arial,sans-serif] bg-[var(--bg-card)] text-[var(--text)] p-5 rounded-[10px] h-fit">

      {/* ================= CATEGORY ================= */}
      {showCategory && (
      <div className="w-full pb-[18px] mb-[18px] border-b border-[var(--border)] last:mb-0 last:border-b-0 last:pb-0">

        <div
          className="group w-full flex items-center justify-between mb-[15px] cursor-pointer select-none"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          <h3 className="m-0 text-sm min-[768px]:text-[15px] font-semibold text-[var(--text)] group-hover:text-[var(--red-hover)]">Category</h3>

          <span className="flex items-center justify-center w-[18px] h-[18px] text-lg font-normal leading-[18px] text-[var(--text-muted)] cursor-pointer group-hover:text-[var(--red-hover)]">
            {categoryOpen ? "−" : "+"}
          </span>
        </div>

        {categoryOpen && (
          <div className="w-full">

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.category === "Laptop"}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.checked ? "Laptop" : ""
                  )
                }
              />
              <span>Laptop</span>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.category === "Desktop"}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.checked ? "Desktop" : ""
                  )
                }
              />
              <span>Desktop</span>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.category === "GPU"}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.checked ? "GPU" : ""
                  )
                }
              />
              <span>GPU</span>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.category === "RAM"}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.checked ? "RAM" : ""
                  )
                }
              />
              <span>RAM</span>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.category === "SSD"}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.checked ? "SSD" : ""
                  )
                }
              />
              <span>SSD</span>
            </label>

          </div>
        )}

      </div>
      )}


      {/* ================= PRICE RANGE ================= */}
      {showPrice && (
      <div className="w-full pb-[18px] mb-[18px] border-b border-[var(--border)] last:mb-0 last:border-b-0 last:pb-0">

        <div
          className="group w-full flex items-center justify-between mb-[15px] cursor-pointer select-none"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <h3 className="m-0 text-sm min-[768px]:text-[15px] font-semibold text-[var(--text)] group-hover:text-[var(--red-hover)]">Price Range</h3>

          <span className="flex items-center justify-center w-[18px] h-[18px] text-lg font-normal leading-[18px] text-[var(--text-muted)] cursor-pointer group-hover:text-[var(--red-hover)]">
            {priceOpen ? "−" : "+"}
          </span>
        </div>

        {priceOpen && (
          <div className="w-full">

            <div className="flex items-center w-full gap-2 box-border mb-3">

              <input
                className="w-1/2 h-[42px] min-[768px]:h-11 box-border py-0 px-4 border border-[var(--border)] rounded-[23px] bg-[var(--bg-card)] text-sm font-normal text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--red)] focus:shadow-[0_0_0_3px_var(--red-bg)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                type="number"
                placeholder="Min ($)"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
              />

              <span className="text-[var(--text-muted)]">-</span>

              <input
                className="w-1/2 h-[42px] min-[768px]:h-11 box-border py-0 px-4 border border-[var(--border)] rounded-[23px] bg-[var(--bg-card)] text-sm font-normal text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--red)] focus:shadow-[0_0_0_3px_var(--red-bg)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                type="number"
                placeholder="Max ($)"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
              />

            </div>

            <button
              type="button"
              onClick={applyPrice}
              className="w-full border-none bg-[var(--red)] text-white py-3 rounded-[30px] text-sm font-bold cursor-pointer transition-[background,box-shadow] duration-200 ease-in-out hover:bg-[var(--red-hover)] hover:shadow-[var(--shadow-red)]"
            >
              APPLY PRICE
            </button>

          </div>
        )}

      </div>
      )}


      {/* ================= BRAND ================= */}
      {showBrand && (
      <div className="w-full pb-[18px] mb-[18px] border-b border-[var(--border)] last:mb-0 last:border-b-0 last:pb-0">

        <div
          className="group w-full flex items-center justify-between mb-[15px] cursor-pointer select-none"
          onClick={() => setBrandOpen(!brandOpen)}
        >
          <h3 className="m-0 text-sm min-[768px]:text-[15px] font-semibold text-[var(--text)] group-hover:text-[var(--red-hover)]">Brand</h3>

          <span className="flex items-center justify-center w-[18px] h-[18px] text-lg font-normal leading-[18px] text-[var(--text-muted)] cursor-pointer group-hover:text-[var(--red-hover)]">
            {brandOpen ? "−" : "+"}
          </span>
        </div>

        {brandOpen && (
          <div className="w-full">

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "Acer"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "Acer" : ""
                  )
                }
              />
              <span>Acer</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(7)</small>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "Apple"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "Apple" : ""
                  )
                }
              />
              <span>Apple</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(44)</small>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "ASUS"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "ASUS" : ""
                  )
                }
              />
              <span>Asus</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(9)</small>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "Dell"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "Dell" : ""
                  )
                }
              />
              <span>Dell</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(4)</small>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "HP"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "HP" : ""
                  )
                }
              />
              <span>HP</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(45)</small>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "Lenovo"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "Lenovo" : ""
                  )
                }
              />
              <span>Lenovo</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(31)</small>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.brand === "MSI"}
                onChange={(e) =>
                  updateFilter(
                    "brand",
                    e.target.checked ? "MSI" : ""
                  )
                }
              />
              <span>MSI</span>
              <small className="ml-px text-[13px] font-normal text-[var(--text-muted)]">(1)</small>
            </label>

          </div>
        )}

      </div>
      )}


      {/* ================= AVAILABILITY ================= */}
      {showAvailability && (
      <div className="w-full pb-[18px] mb-[18px] border-b border-[var(--border)] last:mb-0 last:border-b-0 last:pb-0">

        <div
          className="group w-full flex items-center justify-between mb-[15px] cursor-pointer select-none"
          onClick={() =>
            setAvailabilityOpen(!availabilityOpen)
          }
        >
          <h3 className="m-0 text-sm min-[768px]:text-[15px] font-semibold text-[var(--text)] group-hover:text-[var(--red-hover)]">Availability</h3>

          <span className="flex items-center justify-center w-[18px] h-[18px] text-lg font-normal leading-[18px] text-[var(--text-muted)] cursor-pointer group-hover:text-[var(--red-hover)]">
            {availabilityOpen ? "−" : "+"}
          </span>
        </div>

        {availabilityOpen && (
          <div className="w-full">

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={filters.availability === "In Stock"}
                onChange={(e) =>
                  updateFilter(
                    "availability",
                    e.target.checked ? "In Stock" : ""
                  )
                }
              />
              <span>In Stock</span>
            </label>

            <label className="flex items-center w-full gap-[9px] mb-2.5 text-sm font-normal leading-[18px] text-[var(--text)] cursor-pointer last:mb-0">
              <input
                className="appearance-none w-3.5 h-3.5 min-w-[14px] min-h-[14px] m-0 border border-[var(--border)] rounded-[3px] bg-[var(--bg-card)] cursor-pointer relative shrink-0 checked:bg-[var(--red)] checked:border-[var(--red)] checked:after:content-['✓'] checked:after:absolute checked:after:left-0.5 checked:after:-top-[3px] checked:after:text-xs checked:after:font-semibold checked:after:text-white"
                type="checkbox"
                checked={
                  filters.availability === "Out of Stock"
                }
                onChange={(e) =>
                  updateFilter(
                    "availability",
                    e.target.checked
                      ? "Out of Stock"
                      : ""
                  )
                }
              />
              <span>Out of Stock</span>
            </label>

          </div>
        )}

      </div>
      )}

    </div>
  );
}