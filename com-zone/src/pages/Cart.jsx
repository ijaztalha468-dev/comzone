import { useCart } from "../context/CartContext";

import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";


export default function Cart() {

  const { cart } = useCart();


  return (
    <div className="w-[90%] max-w-[1200px] mx-auto py-10">


      <h1 className="text-center mb-[30px]">
        Shopping Cart
      </h1>


      {
        cart.length === 0 ? (

          <h2>
            Your Cart is Empty
          </h2>

        ) : (

          <div className="grid grid-cols-1 min-[900px]:grid-cols-[2fr_1fr] gap-[30px]">


            {/* Cart Products */}
            <div className="flex flex-col gap-5">

              {
                cart.map((item) => (

                  <CartItem
                    key={item.id}
                    item={item}
                  />

                ))
              }

            </div>



            {/* Summary */}
            <CartSummary />


          </div>

        )
      }


    </div>
  );
}
