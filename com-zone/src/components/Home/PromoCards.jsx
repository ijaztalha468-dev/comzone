import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPromoCards } from "../../services/promoCardService";

export default function PromoCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await getPromoCards();
        setCards(data);
      } catch (error) {
        console.error("Load Promo Cards Error:", error);
      }
    }

    loadCards();
  }, []);

  if (cards.length === 0) {
    return null; // admin ne abhi koi promo card add nahi ki
  }

  return (
    <div className="flex flex-col min-[600px]:flex-row min-[900px]:flex-col gap-5 w-full min-[900px]:w-[32%] shrink-0">

      {cards.map((card) => (
        <div key={card.Id} className="relative rounded-2xl overflow-hidden bg-[var(--bg-hover)] min-h-[190px] flex items-end w-full flex-1">

          {/* Blurred zoomed copy - poore box ko cover karti hai, gap kabhi nahi rehta */}
          <div
            className="absolute inset-0 bg-cover bg-center [filter:blur(0px)_brightness(0.95)] scale-[1.15] z-0"
            style={{ backgroundImage: `url(${card.ImageUrl})` }}
          />

          {/* Asal image - "contain" se poori/uncropped dikhti hai, upar wali blurred layer ke upar */}
          <img
            className="absolute inset-0 w-full h-full object-contain object-center z-[1]"
            src={card.ImageUrl}
            alt={card.Title}
            loading="lazy"
          />

          <div className="relative z-[2] p-[18px] w-full text-white [background:linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]">
            {card.Subtitle && <p className="text-xs mb-1 opacity-90">{card.Subtitle}</p>}
            <h3 className="text-lg mt-0 mx-0 mb-3 text-white">{card.Title}</h3>

            {card.ButtonText && (
              <Link
                to={card.LinkUrl || "/products"}
                className="inline-block bg-[var(--red)] text-white py-2 px-[18px] rounded-[25px] no-underline font-bold text-[13px] transition-colors duration-200 hover:bg-[var(--red-hover)] hover:text-white"
              >
                {card.ButtonText}
              </Link>
            )}
          </div>

        </div>
      ))}

    </div>
  );
}
