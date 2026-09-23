import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="flex justify-end items-center gap-3.5 py-3.5 px-6 bg-white border-b border-slate-200">
          <span className="mr-3 text-slate-600 text-sm">{admin?.name}</span>
          <button onClick={logout}>Logout</button>
        </header>

        <div className="p-6 flex-1 bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
