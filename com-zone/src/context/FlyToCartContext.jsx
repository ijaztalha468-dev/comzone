import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const FlyToCartContext = createContext();

export function FlyToCartProvider({ children }) {

  const cartIconRef = useRef(null);

  const [flights, setFlights] = useState([]);


  // Product image se cart icon tak "fly" karwane wala function
  const flyToCart = useCallback((imageUrl, fromElement) => {

    if (!imageUrl || !fromElement || !cartIconRef.current) return;

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = cartIconRef.current.getBoundingClientRect();

    const id = Date.now() + Math.random();

    setFlights((prev) => [
      ...prev,
      { id, imageUrl, fromRect, toRect },
    ]);

    // Animation khatam hone ke baad element ko DOM se hata dena
    setTimeout(() => {
      setFlights((prev) => prev.filter((f) => f.id !== id));
    }, 650);

  }, []);


  return (
    <FlyToCartContext.Provider value={{ cartIconRef, flyToCart }}>

      {children}

      {flights.map((flight) => (
        <FlyingImage key={flight.id} {...flight} />
      ))}

    </FlyToCartContext.Provider>
  );
}


// Ek dafa ki flying image — inline styles use karta hai, isliye
// light/dark theme (CSS variables) se bilkul independent hai.
function FlyingImage({ imageUrl, fromRect, toRect }) {

  const [style, setStyle] = useState({
    position: "fixed",
    top: fromRect.top,
    left: fromRect.left,
    width: fromRect.width,
    height: fromRect.height,
    borderRadius: "10px",
    objectFit: "cover",
    zIndex: 2000,
    pointerEvents: "none",
    opacity: 1,
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
    transition: "top 600ms cubic-bezier(0.55,0,0.85,0.35), left 600ms cubic-bezier(0.55,0,0.85,0.35), width 600ms cubic-bezier(0.55,0,0.85,0.35), height 600ms cubic-bezier(0.55,0,0.85,0.35), opacity 600ms ease-in, border-radius 600ms ease",
  });

  useEffect(() => {

    // Ek frame chhor kar target position set karte hain,
    // taake transition trigger ho (warna browser directly end-state render kar dega)
    const frame = requestAnimationFrame(() => {
      setStyle((prev) => ({
        ...prev,
        top: toRect.top + toRect.height / 2 - 10,
        left: toRect.left + toRect.width / 2 - 10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        opacity: 0.4,
      }));
    });

    return () => cancelAnimationFrame(frame);

  }, [toRect]);

  return <img src={imageUrl} alt="" style={style} />;
}


export function useFlyToCart() {
  return useContext(FlyToCartContext);
}
