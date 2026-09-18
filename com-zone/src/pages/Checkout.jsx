import CheckoutForm from "../components/Checkout/CheckoutForm";
import Payment from "../components/Checkout/Payment";

export default function Checkout() {

  return (
    <div className="w-[90%] max-w-[1200px] mx-auto py-10">

      <h1 className="text-center mb-[30px]">
        Checkout
      </h1>

      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-[30px]">

        {/* Customer Form */}
        <CheckoutForm />

        {/* Payment */}
        <Payment />

      </div>

    </div>
  );
}
