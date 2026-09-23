import { NavLink } from "react-router-dom";

const linkBase =
  "text-slate-300 no-underline py-3 px-6 text-[15px] border-l-4 hover:bg-slate-800 hover:text-white";

function linkClass({ isActive }) {
  return `${linkBase} ${isActive ? "bg-slate-800 text-white border-blue-600 font-semibold" : "border-transparent"}`;
}

export default function Sidebar() {
  return (
    <aside className="w-[220px] min-h-screen bg-slate-900 py-5 shrink-0">
      <h2 className="text-white text-lg px-5 pt-0 pb-5 m-0 border-b border-slate-800 mb-2.5">COM-ZONE Admin</h2>

      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/dashboard/orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/dashboard/sliders" className={linkClass}>
          Hero Slider
        </NavLink>

        <NavLink to="/dashboard/promo-cards" className={linkClass}>
          Promo Cards
        </NavLink>

        <NavLink to="/dashboard/subcategories" className={linkClass}>
          Subcategories
        </NavLink>

        <NavLink to="/dashboard/offers" className={linkClass}>
          Offers
        </NavLink>

        <NavLink to="/dashboard/brands" className={linkClass}>
          Brands
        </NavLink>

        <NavLink to="/dashboard/messages" className={linkClass}>
          Messages
        </NavLink>

        <NavLink to="/dashboard/customers" className={linkClass}>
          User
        </NavLink>
      </nav>
    </aside>
  );
}
