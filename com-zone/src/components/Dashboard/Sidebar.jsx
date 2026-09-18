import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, MapPin, UserCog } from "lucide-react";

const linkBase =
  "text-[var(--text-muted)] no-underline py-3 px-6 text-[15px] border-l-4 transition-colors duration-200";

function linkClass({ isActive }) {
  return `${linkBase} ${
    isActive
      ? "bg-[var(--bg-elevated-2)] text-[var(--red-hover)] border-[var(--red)] font-semibold"
      : "border-transparent hover:bg-[var(--bg-elevated-2)] hover:text-[var(--red-hover)] hover:border-[var(--red-hover)]"
  }`;
}

export default function Sidebar() {
  return (
    <aside className="w-[220px] min-h-[calc(100vh-80px)] bg-[var(--bg)] py-6 shrink-0">
      <h3>My Account</h3>

      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" end className={linkClass}>
          <span>Dashboard</span>
          <LayoutDashboard size={18} strokeWidth={1.6} />
        </NavLink>

        <NavLink to="/dashboard/orders" className={linkClass}>
          <span>Orders</span>
          <Package size={18} strokeWidth={1.6} />
        </NavLink>

        <NavLink to="/dashboard/addresses" className={linkClass}>
          <span>Addresses</span>
          <MapPin size={18} strokeWidth={1.6} />
        </NavLink>

        <NavLink to="/dashboard/settings" className={linkClass}>
          <span>Account details</span>
          <UserCog size={18} strokeWidth={1.6} />
        </NavLink>
      </nav>
    </aside>
  );
}
