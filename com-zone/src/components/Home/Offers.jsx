import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOffers } from "../../services/offerService";

export default function Offers() {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (error) {
        console.error("Load Offers Error:", error);
      }
    }

    loadOffers();
  }, []);

  if (offers.length === 0) {
    return null; // admin ne abhi koi offer add nahi ki
  }

  return (
    <section className="w-[95%] min-[600px]:w-[90%] max-w-[1200px] my-[70px] mx-auto">

      <h2 className="relative text-center text-[32px] font-extrabold text-[var(--text)] mb-10 after:content-[''] after:absolute after:w-[60px] after:h-1 after:bg-[var(--red)] after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:rounded-[10px]">
        Special Offers
      </h2>


      <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[820px]:grid-cols-3 gap-[30px]">

        {offers.map((offer) => (

          <div 
            className="group relative overflow-hidden rounded-[20px] bg-[var(--bg-card)] shadow-[0_12px_30px_rgba(0,0,0,0.15)] cursor-pointer transition-[transform,box-shadow] duration-[400ms] ease-in-out hover:-translate-y-[10px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] h-[280px] min-[600px]:h-[330px] after:content-[''] after:absolute after:inset-0 after:[background:linear-gradient(to_top,rgba(0,0,0,0.75),transparent)]"
            key={offer.Id}
          >

            <img
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={offer.ImageUrl}
              alt={offer.Title}
              loading="lazy"
            />


            <div className="absolute left-5 bottom-5 min-[600px]:left-[30px] min-[600px]:bottom-[30px] z-[2] text-white">

              <h3 className="text-[22px] min-[600px]:text-[28px] font-extrabold mb-2.5 text-white">
                {offer.Title}
              </h3>

              <p className="text-lg text-[var(--red-hover)] font-bold mb-5">
                {offer.Discount}
              </p>


              <Link to={offer.LinkUrl || "/products"}>
                <button className="border-none bg-[var(--red)] text-white py-3 px-[25px] rounded-[30px] text-[15px] font-semibold cursor-pointer transition-[background,box-shadow,transform] duration-300 ease-in-out hover:bg-[var(--red-hover)] hover:shadow-[var(--shadow-red)] hover:scale-105">
                  Shop Now
                </button>
              </Link>

            </div>


          </div>

        ))}


      </div>


    </section>
  );
}
