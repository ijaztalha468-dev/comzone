import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex items-start">
      <Sidebar />

      <div className="flex-1 py-[30px] px-10">
        <Outlet />
      </div>
    </div>
  );
}
