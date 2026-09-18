import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";


// Home turant chahiye (landing page), isliye normal import
import Home from "../pages/Home";

// Baaki pages sirf tab load hote hain jab unki zaroorat ho (route-based code splitting)
// - pehli load halki ho jati hai, kyunke saara JS ek sath download nahi hota
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Profile = lazy(() => import("../pages/profile"));
const DashboardLayout = lazy(() => import("../pages/Dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("../pages/Dashboard/DashboardHome"));
const MyOrders = lazy(() => import("../pages/Dashboard/MyOrders"));
const OrderDetail = lazy(() => import("../pages/Dashboard/OrderDetail"));
const Settings = lazy(() => import("../pages/Dashboard/Settings"));
const Addresses = lazy(() => import("../pages/Dashboard/Addresses"));
const Laptop = lazy(() => import("../pages/Laptop"));
const Desktop = lazy(() => import("../pages/Desktop"));
const GPU = lazy(() => import("../pages/GPU"));
const RAM = lazy(() => import("../pages/RAM"));
const SSD = lazy(() => import("../pages/SSD"));
const HDD = lazy(() => import("../pages/HDD"));
const PSU = lazy(() => import("../pages/PSU"));
const Monitor = lazy(() => import("../pages/Monitor"));
const Network = lazy(() => import("../pages/Network"));
const Printer = lazy(() => import("../pages/Printer"));
const Accessories = lazy(() => import("../pages/Accessories"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Error404 = lazy(() => import("../pages/Error404"));



export default function AppRoutes() {


  return (

    <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh] text-base text-[var(--text-muted)]">Loading...</div>}>
    <Routes>


      <Route path="/" element={<Home />} />


      {/* Products */}

      <Route path="/products" element={<Products />} />

      <Route 
        path="/product/:id" 
        element={<ProductDetail />} 
      /> 
      
      


      {/* Categories */}

      <Route path="/laptop" element={<Laptop />} />

      <Route path="/desktop" element={<Desktop />} />

      <Route path="/gpu" element={<GPU />} />

      <Route path="/ram" element={<RAM />} />

      <Route path="/ssd" element={<SSD />} />

      <Route path="/hdd" element={<HDD />} />

      <Route path="/psu" element={<PSU />} />

      <Route path="/monitor" element={<Monitor />} />

      <Route path="/network" element={<Network />} />

      <Route path="/printer" element={<Printer />} />

      <Route 
        path="/accessories" 
        element={<Accessories />} 
      />



      {/* Shopping */}

      <Route path="/cart" element={<Cart />} />

      <Route 
        path="/checkout" 
        element={<Checkout />} 
      />



      {/* Information */}

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />
<Route
  path="/profile"
  element={<Profile/>}                     
/>

<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="orders" element={<MyOrders />} />
  <Route path="orders/detail" element={<OrderDetail />} />
  <Route path="orders/detail/:orderId" element={<OrderDetail />} />
  <Route path="addresses" element={<Addresses />} />
  <Route path="settings" element={<Settings />} />
</Route>


      {/* 404 */}

      <Route 
        path="*" 
        element={<Error404 />} 
      />


    </Routes>
    </Suspense>

  );

}
