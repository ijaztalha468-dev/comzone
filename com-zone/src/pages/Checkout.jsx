import CheckoutForm from "../components/Checkout/CheckoutForm";
import Payment from "../components/Checkout/Payment";

export default function Checkout() {

  return (
    <div className="checkout-page">

      <h1>
        Checkout
      </h1>

      <div className="checkout-container">

        {/* Customer Form */}
        <CheckoutForm />

        {/* Payment */}
        <Payment />

      </div>

    </div>
  );
}
