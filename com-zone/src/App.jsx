import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/Common/ScrollToTop";
import WhatsAppButton from "./components/Common/WhatsAppButton";
import FloatingCartButton from "./components/Common/FloatingCartButton";
import CartDrawer from "./components/Cart/CartDrawer";

// CSS Files

import "./css/App.css";



export default function App() {


  return (

    <>

      <ScrollToTop />


      <Navbar />


      <main>

        <AppRoutes />

      </main>


      <Footer />

      <WhatsAppButton />
      <FloatingCartButton />
<CartDrawer />

    </>

  );

}