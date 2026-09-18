import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const linkClass =
  "no-underline text-white text-[15px] transition-transform duration-300 ease-in-out w-fit hover:text-[var(--red-hover)] min-[600px]:hover:translate-x-2";
const boxHeadingClass =
  "font-display text-[22px] text-white font-semibold mb-[15px] relative after:content-[''] after:absolute after:w-[50px] after:h-[3px] after:bg-[var(--bg-card)] after:-bottom-2 after:rounded-[10px] after:left-1/2 after:-translate-x-1/2 min-[600px]:after:left-0 min-[600px]:after:translate-x-0 group-hover:[text-shadow:0_0_15px_rgba(255,255,255,0.8)]";
const boxParaClass = "text-white text-[15px] leading-[1.7] m-0";

export default function Footer() {

  /* =====================================================
     FOOTER HEADLINE — ROTATING LINES
  ====================================================== */

  const headlineMessages = [
    "Upgrade Your Setup Today",
    "Best Prices on Branded PC Parts & Laptops",
    "Fast Delivery Across Pakistan",
  ];

  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setHeadlineIndex(
        (prev) => (prev + 1) % headlineMessages.length
      );

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  return (
    <>

      {/* Footer Headline */}
      <div
        className="relative w-full mt-[60px] p-2.5 text-center overflow-hidden text-white [background:linear-gradient(135deg,var(--red-dark),var(--red))]"
      >
        <div
          className="absolute inset-0 opacity-40 [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2260%22%20height%3D%2260%22%3E%3Cpath%20d%3D%22M0%2030h20M40%2030h20M30%200v20M30%2040v20%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222.5%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2230%22%20r%3D%221.4%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2230%22%20r%3D%221.4%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E')] [background-size:60px_60px]"
        />
        <h2 key={headlineIndex} className="relative font-display text-[15px] min-[600px]:text-lg font-semibold tracking-tight animate-footer-headline-fade text-white">
          {headlineMessages[headlineIndex]}
        </h2>
      </div>

    <footer className="w-full bg-black text-white grid grid-cols-1 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-4 gap-10 py-[50px] px-[30px] min-[1000px]:pt-[60px] min-[1000px]:px-[50px] min-[1000px]:pb-[25px] text-center min-[600px]:text-left">

      {/* Company */}
      <div className="group flex flex-col gap-[15px] items-center min-[600px]:items-stretch">
        <h3 className={boxHeadingClass}>COM-ZONE</h3>

        <p className={boxParaClass}>
          Your trusted computer store for laptops,
          desktops, GPUs, RAM, SSD and accessories.
        </p>
      </div>


      {/* Quick Links */}
      <div className="group flex flex-col gap-[15px] items-center min-[600px]:items-stretch">

        <h3 className={boxHeadingClass}>Quick Links</h3>

        <Link className={linkClass} to="/">Home</Link>
        <Link className={linkClass} to="/products">Products</Link>
        <Link className={linkClass} to="/about">About</Link>
        <Link className={linkClass} to="/contact">Contact</Link>

      </div>


      {/* Categories */}
      <div className="group flex flex-col gap-[15px] items-center min-[600px]:items-stretch">

        <h3 className={boxHeadingClass}>Categories</h3>

        <Link className={linkClass} to="/laptop">Laptop</Link>
        <Link className={linkClass} to="/desktop">Desktop</Link>
        <Link className={linkClass} to="/gpu">GPU</Link>
        <Link className={linkClass} to="/ram">RAM</Link>
        <Link className={linkClass} to="/ssd">SSD</Link>
        <Link className={linkClass} to="/accessories">Accessories</Link>

      </div>


      {/* Support */}
      <div className="group flex flex-col gap-[15px] items-center min-[600px]:items-stretch">

        <h3 className={boxHeadingClass}>Support</h3>

        <p className={boxParaClass}>
          Email: support@com-zone.com
        </p>

        <p className={boxParaClass}>
          Phone: +92 300 0000000
        </p>

        <p className={boxParaClass}>
          Pakistan
        </p>

      </div>


      {/* Bottom */}
      <div className="[grid-column:1/-1] border-t border-[rgba(255,255,255,0.5)] mt-[35px] pt-5 text-center">

        <p className="text-white text-sm">
          © 2026 COM-ZONE. All Rights Reserved.
        </p>

      </div>


    </footer>

    </>
  );
}
