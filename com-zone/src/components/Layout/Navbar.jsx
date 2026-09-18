import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  User,
  ShoppingBag,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import SearchBar from "../Common/SearchBar";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useFlyToCart } from "../../context/FlyToCartContext";

import { getSubcategories } from "../../services/subcategoryService";

import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";

const navLinkBase =
  "no-underline text-[15px] font-semibold transition-all duration-300 hover:text-[var(--red-hover)]";

function navLinkClass({ isActive }) {
  return `${navLinkBase} ${isActive ? "text-[var(--red-hover)]" : "text-[var(--text-muted)]"}`;
}

function navItemLinkClass({ isActive }) {
  return `${navLinkClass({ isActive })} inline-flex items-center gap-1`;
}

const iconBtnBase =
  "relative bg-transparent border-none p-0 text-[var(--text)] text-[22px] cursor-pointer flex items-center gap-1.5 no-underline transition-colors duration-200 ease-in-out hover:bg-transparent hover:shadow-none hover:text-[var(--red-hover)] focus:bg-transparent focus:shadow-none focus:text-[var(--red-hover)] active:bg-transparent active:shadow-none active:text-[var(--red-hover)]";

export default function Navbar() {

  const { cart, toggleCart } = useCart();

  const { user, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const { cartIconRef } = useFlyToCart();

  const navigate = useNavigate();


  /* =====================================================
     MODAL STATES
  ====================================================== */

  const [loginOpen, setLoginOpen] = useState(false);

  const [registerOpen, setRegisterOpen] = useState(false);


  /* =====================================================
     SUBCATEGORIES
  ====================================================== */

  const [subcategories, setSubcategories] = useState([]);


  /* =====================================================
     TOP BAR MESSAGES
  ====================================================== */

  const topbarMessages = [
    "Best prices on branded PC parts & laptops.",
    "Free delivery on orders above Rs. 10,000.",
    "New arrivals every week - check them out!",
  ];


  const [topbarIndex, setTopbarIndex] = useState(0);


  /* =====================================================
     TOP BAR SLIDER
  ====================================================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setTopbarIndex(
        (prev) =>
          (prev + 1) % topbarMessages.length
      );

    }, 3000);


    return () => clearInterval(timer);

  }, []);


  /* =====================================================
     LOAD SUBCATEGORIES
  ====================================================== */

  useEffect(() => {

    async function loadSubcategories() {

      try {

        const data = await getSubcategories();

        setSubcategories(data);

      } catch (error) {

        console.error(
          "Load Subcategories Error:",
          error
        );

      }

    }


    loadSubcategories();

  }, []);


  /* =====================================================
     GET DROPDOWN FOR CATEGORY
  ====================================================== */

  function getDropdownFor(categoryName) {

    return subcategories.filter(
      (s) =>
        s.ParentCategory === categoryName
    );

  }


  /* =====================================================
     CART TOTAL QUANTITY
  ====================================================== */

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (
    <>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="w-full bg-[var(--bg-elevated)] border-b border-[var(--border)] flex flex-col shadow-[0_3px_10px_rgba(0,0,0,0.4)] sticky top-0 z-[1000]">


        {/* =================================================
            TOP UTILITY BAR
        ================================================= */}

        <div className="hidden min-[600px]:flex min-[600px]:flex-wrap min-[600px]:gap-2 min-[600px]:items-center min-[600px]:justify-between min-[600px]:py-2 min-[600px]:px-5 min-[900px]:flex-nowrap min-[900px]:px-[35px] w-full bg-[var(--bg)] border-b border-[var(--border-soft)] text-[13px] text-[var(--text-muted)]">


          {/* TOP MESSAGE */}

          <span
            className="inline-block font-medium animate-topbar-fade"
            key={topbarIndex}
          >
            {topbarMessages[topbarIndex]}
          </span>


          {/* TOP LINKS */}

          <div className="flex gap-5">


            {/* ABOUT */}

            <Link className="text-[var(--text-muted)] no-underline hover:text-[var(--red-hover)]" to="/about">
              About us
            </Link>


            {/* CONTACT */}

            <Link className="text-[var(--text-muted)] no-underline hover:text-[var(--red-hover)]" to="/contact">
              Contact us
            </Link>


            {/* ORDER TRACKING */}

            <button
              type="button"
              className="bg-transparent border-none text-[var(--text-muted)] text-[13px] cursor-pointer p-0 [font-family:inherit] hover:text-[var(--red-hover)]"
              onClick={() => {

                if (user) {

                  navigate(
                    "/dashboard/orders"
                  );

                } else {

                  setLoginOpen(true);

                }

              }}
            >
              Order tracking
            </button>


          </div>

        </div>


        {/* =================================================
            MIDDLE NAVBAR
            LOGO + SEARCH + CART + PROFILE
        ================================================= */}

        <div className="w-full h-auto min-[900px]:h-20 flex items-center justify-between flex-wrap min-[900px]:flex-nowrap p-5 min-[900px]:p-0 min-[900px]:px-5 min-[1200px]:px-[35px]">


          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="no-underline flex font-display text-xl min-[600px]:text-[28px] font-bold tracking-tight rounded-md overflow-hidden border border-[var(--border)]"
          >

            <span className="bg-[var(--bg)] text-[var(--text)] py-1 px-2.5">
              COM
            </span>

            <span className="bg-[var(--red)] text-[var(--bg)] py-1 px-2.5">
              ZONE
            </span>

          </Link>


          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <SearchBar />


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-[22px]">


            {/* =================================================
                THEME TOGGLE (DARK / LIGHT)
            ================================================= */}

            <button
              type="button"
              className="relative border-none p-0 text-[var(--text)] text-[22px] cursor-pointer flex items-center justify-center gap-1.5 no-underline transition-colors duration-200 ease-in-out w-9 h-9 rounded-full bg-[var(--bg-hover)] hover:bg-[var(--red-bg)] hover:text-[var(--red-hover)] focus:text-[var(--red-hover)] active:text-[var(--red-hover)]"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              title={
                theme === "light"
                  ? "Dark mode"
                  : "Light mode"
              }
            >

              {theme === "light" ? (

                <Moon
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

              ) : (

                <Sun
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

              )}

            </button>


            {/* =================================================
                SHOPPING CART
            ================================================= */}

            <button
              type="button"
              ref={cartIconRef}
              onClick={toggleCart}
              className={iconBtnBase}
              aria-label="Shopping cart"
              title="Cart"
            >

              <ShoppingBag
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
              />


              {/* CART COUNT */}

              {cartCount > 0 && (

                <span className="absolute -top-2.5 -right-3 bg-[var(--red)] text-white w-5 h-5 rounded-full flex justify-center items-center text-xs font-bold">
                  {cartCount}
                </span>

              )}

            </button>


            {/* =================================================
                PROFILE
            ================================================= */}

            <button
              type="button"
              className={iconBtnBase}
              onClick={() => {

                if (user) {

                  navigate("/dashboard");

                } else {

                  setLoginOpen(true);

                }

              }}

              aria-label={
                user
                  ? "Open profile"
                  : "Login"
              }

              title={
                user
                  ? "Profile"
                  : "Login"
              }
            >

              <User
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
              />


              {/* USER NAME */}

              {user && (

                <span className="text-sm font-medium">
                  {user.name}
                </span>

              )}

            </button>


            {/* =================================================
                LOGOUT
            ================================================= */}

            {user && (

              <button
                type="button"
                className="bg-[var(--red)] border-none text-white text-sm py-1.5 px-3 rounded-lg cursor-pointer transition-[background,box-shadow] duration-200 ease-in-out hover:bg-[var(--red-hover)] hover:shadow-[var(--shadow-red)]"
                onClick={() => {

                  logout();

                  navigate("/");

                }}
              >
                Logout
              </button>

            )}


          </div>

        </div>


        {/* =================================================
            BOTTOM NAVIGATION
        ================================================= */}

        <nav className="hidden min-[600px]:flex min-[600px]:items-center min-[600px]:gap-4 min-[600px]:overflow-x-auto min-[900px]:overflow-visible min-[1200px]:gap-[30px] py-3 px-[35px] bg-[var(--bg-elevated-2)] border-t border-[var(--border-soft)]">


          {/* =================================================
              HOME
          ================================================= */}

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>


          {/* =================================================
              CATEGORY LIST
          ================================================= */}

          {[
            /* ================= PRODUCTS ================= */

            {
              label: "Products",
              to: "/products",
              key: "Products",
            },


            /* ================= LAPTOP ================= */

            {
              label: "Laptop",
              to: "/laptop",
              key: "Laptop",
            },


            /* ================= DESKTOP ================= */

            {
              label: "Desktop",
              to: "/desktop",
              key: "Desktop",
            },


            /* ================= GPU ================= */

            {
              label: "GPU",
              to: "/gpu",
              key: "GPU",
            },


            /* ================= RAM ================= */

            {
              label: "RAM",
              to: "/ram",
              key: "RAM",
            },


            /* ================= SSD ================= */

            {
              label: "SSD",
              to: "/ssd",
              key: "SSD",
            },


            /* ================= HDD ================= */

            {
              label: "HDD",
              to: "/hdd",
              key: "HDD",
            },


            /* ================= PSU ================= */

            {
              label: "PSU",
              to: "/psu",
              key: "PSU",
            },


            /* ================= MONITOR ================= */

            {
              label: "Monitor",
              to: "/monitor",
              key: "Monitor",
            },


            /* ================= NETWORK ================= */

            {
              label: "Network",
              to: "/network",
              key: "Network",
            },


            /* ================= PRINTER ================= */

            {
              label: "Printer",
              to: "/printer",
              key: "Printer",
            },


            /* ================= ACCESSORIES ================= */

            {
              label: "Accessories",
              to: "/accessories",
              key: "Accessories",
            },

          ].map((item) => {


            /* =================================================
                GET SUBCATEGORIES
            ================================================= */

            const dropdownItems =
              getDropdownFor(item.key);


            return (

              <div
                className="group relative"
                key={item.key}
              >


                {/* =================================================
                    CATEGORY LINK
                ================================================= */}

                <NavLink
                  to={item.to}
                  className={navItemLinkClass}
                >

                  <span>
                    {item.label}
                  </span>


                  {/* =================================================
                      CHEVRON
                  ================================================= */}

                  {dropdownItems.length > 0 && (

                    <ChevronDown
                      className="w-4 h-4 shrink-0 transition-transform duration-200 ease-in-out group-hover:translate-y-px"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />

                  )}

                </NavLink>


                {/* =================================================
                    DROPDOWN
                ================================================= */}

                {dropdownItems.length > 0 && (

                  <div className="hidden group-hover:block absolute top-full left-0 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] py-2 min-w-[220px] z-50">

                    {dropdownItems.map(
                      (sub) => (

                        <Link
                          className="block py-2.5 px-[18px] !text-[var(--text)] font-medium text-sm hover:bg-[var(--bg-hover)] hover:!text-[var(--red-hover)]"
                          key={sub.Id}
                          to={sub.LinkUrl}
                        >
                          {sub.Label}
                        </Link>

                      )
                    )}

                  </div>

                )}

              </div>

            );

          })}


        </nav>


      </header>


      {/* =====================================================
          LOGIN MODAL
      ====================================================== */}

      <LoginModal

        isOpen={loginOpen}

        onClose={() =>
          setLoginOpen(false)
        }

        onRegisterClick={() => {

          setLoginOpen(false);

          setRegisterOpen(true);

        }}

      />


      {/* =====================================================
          REGISTER MODAL
      ====================================================== */}

      <RegisterModal

        isOpen={registerOpen}

        onClose={() =>
          setRegisterOpen(false)
        }

        onLoginClick={() => {

          setRegisterOpen(false);

          setLoginOpen(true);

        }}

      />

    </>
  );
}
