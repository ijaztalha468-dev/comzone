import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import DashboardLayout from "./components/Layout/DashboardLayout";

// Dashboard ke andar wale pages sirf tab load hote hain jab unpe click ho
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const Products = lazy(() => import("./pages/Products"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Sliders = lazy(() => import("./pages/Sliders"));
const PromoCards = lazy(() => import("./pages/PromoCards"));
const Subcategories = lazy(() => import("./pages/Subcategories"));
const Offers = lazy(() => import("./pages/Offers"));
const Brands = lazy(() => import("./pages/Brands"));
const Messages = lazy(() => import("./pages/Messages"));
const Customers = lazy(() => import("./pages/Customers"));

export default function App() {
  const { admin } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-loading">Loading...</div>}>
      <Routes>

        <Route
          path="/login"
          element={admin ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={admin ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="sliders" element={<Sliders />} />
          <Route path="promo-cards" element={<PromoCards />} />
          <Route path="subcategories" element={<Subcategories />} />
          <Route path="offers" element={<Offers />} />
          <Route path="brands" element={<Brands />} />
          <Route path="messages" element={<Messages />} />
          <Route path="customers" element={<Customers />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={admin ? "/dashboard" : "/login"} />}
        />

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
