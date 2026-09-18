import { useEffect, useState } from "react";
import { getBrands } from "../../services/brandService";

export default function Brands() {

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function loadBrands() {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error("Load Brands Error:", error);
      }
    }

    loadBrands();
  }, []);

  if (brands.length === 0) {
    return null; // admin ne abhi koi brand add nahi ki
  }

  // Seamless loop ke liye list ko do dafa render karte hain (Categories jaisa)
  const marqueeItems = [...brands, ...brands];

  return (
    <section className="w-full overflow-hidden pt-5 px-5 pb-[30px] min-[600px]:pt-[30px]">

      <h2 className="relative text-center text-[26px] min-[700px]:text-[52px] font-extrabold text-[var(--text)] mb-10 after:content-[''] after:absolute after:w-[60px] after:h-1 after:bg-[var(--red)] after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:rounded-[10px]">
        Top Brands
      </h2>

      <div className="group overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">

        <div className="flex items-center gap-[25px] min-[600px]:gap-[35px] min-[900px]:gap-[90px] w-max pt-[15px] pb-[25px] animate-brand-scroll group-hover:[animation-play-state:paused]">

          {marqueeItems.map((brand, index) => (

            <div
              className="group/pill flex-grow-0 flex-shrink-0 basis-[105px] min-[600px]:basis-[130px] min-[900px]:basis-[150px] w-[105px] min-[600px]:w-[150px] flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-[5px]"
              key={`${brand.Id}-${index}`}
            >

              <div className="w-[95px] h-[95px] min-[600px]:w-[120px] min-[600px]:h-[120px] min-[900px]:w-[135px] min-[900px]:h-[135px] min-w-[95px] min-h-[95px] min-[600px]:min-w-[120px] min-[600px]:min-h-[120px] min-[900px]:min-w-[195px] min-[900px]:min-h-[195px] rounded-full overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] shrink-0 transition-[border-color,box-shadow] duration-[250ms] ease-in-out group-hover/pill:border-[var(--red-border)] group-hover/pill:shadow-[var(--shadow-red)]">

                <img
                  className="w-full h-full object-contain p-4 min-[900px]:p-6"
                  src={brand.ImageUrl}
                  alt={brand.Name}
                  loading="lazy"
                />

              </div>

              <h3 className="mt-[9px] min-[600px]:mt-3 mx-0 mb-0 text-sm min-[600px]:text-base font-semibold text-[var(--text)] text-center whitespace-nowrap transition-colors duration-[250ms] ease-in-out group-hover/pill:text-[var(--red-hover)]">
                {brand.Name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
