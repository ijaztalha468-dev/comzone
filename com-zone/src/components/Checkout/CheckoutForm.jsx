import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";
import { calculateTotal, formatPrice } from "../../utils/helpers";

const inputClass =
  "w-full box-border border border-[var(--border)] rounded-[30px] px-5 mb-4 bg-[var(--bg-card)] text-[var(--text)] outline-none transition-all duration-[250ms] ease-in-out [font-family:inherit] placeholder:text-[var(--text-muted)] hover:border-[var(--red-border)] focus:border-[var(--red)] focus:shadow-[0_0_0_3px_var(--red-bg)] h-[54px] text-sm min-[600px]:h-[58px] min-[600px]:text-[15px]";
const selectClass =
  "w-full box-border border border-[var(--border)] rounded-[30px] px-5 mb-4 bg-[var(--bg-card)] text-[var(--text)] outline-none transition-all duration-[250ms] ease-in-out [font-family:inherit] placeholder:text-[var(--text-muted)] hover:border-[var(--red-border)] focus:border-[var(--red)] focus:shadow-[0_0_0_3px_var(--red-bg)] h-[54px] text-sm min-[600px]:h-[58px] min-[600px]:text-[15px] appearance-none cursor-pointer bg-no-repeat [background-image:linear-gradient(45deg,transparent_50%,var(--text-muted)_50%),linear-gradient(135deg,var(--text-muted)_50%,transparent_50%)] [background-position:calc(100%-22px)_25px,calc(100%-16px)_25px] [background-size:6px_6px,6px_6px]";

export default function CheckoutForm() {
  const { cart, loadCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Billing
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Billing Address
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Shipping
    shippingFirstName: "",
    shippingLastName: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCountry: "",

    // Payment
    paymentMethod: "Cash On Delivery",
    wallet: "",
    accountNumber: "",
    bankName: "",
    transactionId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await placeOrder({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,

        // Billing address
        address: formData.address,
        city: formData.city,

        // Shipping address
        shippingFirstName: formData.shippingFirstName,
        shippingLastName: formData.shippingLastName,
        shippingPhone: formData.shippingPhone,
        shippingAddress: formData.shippingAddress,
        shippingApartment: formData.shippingApartment,
        shippingCity: formData.shippingCity,
        shippingState: formData.shippingState,
        shippingZipCode: formData.shippingZipCode,
        shippingCountry: formData.shippingCountry,

        // Payment
        paymentMethod: formData.paymentMethod,
        wallet: formData.wallet,
        accountNumber: formData.accountNumber,
        bankName: formData.bankName,
        transactionId: formData.transactionId,
      });

      await loadCart();

      navigate("/dashboard/orders", {
        state: {
          successOrderId: result.data.orderId,
        },
      });
    } catch (err) {
      console.error("Place Order Error:", err);

      setError(
        err.response?.data?.message ||
          "Order place nahi ho saka. Dobara try karein."
      );
    } finally {
      setLoading(false);
    }
  }

  const total = calculateTotal(cart);

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-[900px]:flex-row items-start gap-[30px] w-full">

      {/* =========================================
          CHECKOUT FORM
      ========================================= */}
      <form
        className="flex-[2] w-full bg-[var(--bg-card)] rounded-[18px] box-border py-5 px-[15px] min-[600px]:p-[30px]"
        onSubmit={handleSubmit}
      >

        {/* =========================================
            CHECKOUT STEPS
        ========================================= */}
        <div className="flex items-center w-full mb-[35px] overflow-x-auto pb-[5px] min-[600px]:overflow-visible min-[600px]:pb-0">

          <div className="flex items-center gap-[9px] text-[var(--text)] text-xs min-[600px]:text-sm font-medium whitespace-nowrap">
            <span className="w-[30px] h-[30px] rounded-full border border-[var(--red)] bg-[var(--red)] text-white flex items-center justify-center text-[13px]">1</span>
            <span>Billing</span>
          </div>

          <div className="flex-1 h-px bg-[var(--border)] min-w-[25px] mx-2 min-[600px]:min-w-0 min-[600px]:mx-[15px]"></div>

          <div className="flex items-center gap-[9px] text-[var(--text)] text-xs min-[600px]:text-sm font-medium whitespace-nowrap">
            <span className="w-[30px] h-[30px] rounded-full border border-[var(--red)] bg-[var(--red)] text-white flex items-center justify-center text-[13px]">2</span>
            <span>Shipping</span>
          </div>

          <div className="flex-1 h-px bg-[var(--border)] min-w-[25px] mx-2 min-[600px]:min-w-0 min-[600px]:mx-[15px]"></div>

          <div className="flex items-center gap-[9px] text-[var(--text)] text-xs min-[600px]:text-sm font-medium whitespace-nowrap">
            <span className="w-[30px] h-[30px] rounded-full border border-[var(--red)] bg-[var(--red)] text-white flex items-center justify-center text-[13px]">3</span>
            <span>Payment</span>
          </div>

        </div>


        {/* =========================================
            BILLING INFORMATION
        ========================================= */}
        <section className="w-full pb-[35px] mb-[35px] border-b border-[var(--border)] last:border-b-0 last:mb-0 last:pb-0">

          <div className="flex items-center gap-[15px] mb-[25px]">
            <span className="w-[38px] h-[38px] flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text)] rounded-full text-[13px] font-semibold">01</span>

            <div>
              <h2 className="text-[19px] min-[600px]:text-[22px] font-semibold text-[var(--text)] m-0">Billing Information</h2>
              <p className="mt-1.5 mx-0 mb-0 text-[var(--text-muted)] text-sm">Enter your billing details</p>
            </div>
          </div>


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              className={inputClass}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

          </div>


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className={inputClass}
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>


          <input
              className={inputClass}
              type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
          />


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="text"
              name="apartment"
              placeholder="Apartment, Suite (Optional)"
              value={formData.apartment}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

          </div>


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="text"
              name="state"
              placeholder="State / Province"
              value={formData.state}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="text"
              name="zipCode"
              placeholder="ZIP / Postal Code"
              value={formData.zipCode}
              onChange={handleChange}
            />

          </div>


          <input
              className={inputClass}
              type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />

        </section>


        {/* =========================================
            SHIPPING INFORMATION
        ========================================= */}
        <section className="w-full pb-[35px] mb-[35px] border-b border-[var(--border)] mt-[5px]">

          <div className="flex items-center gap-[15px] mb-[25px]">

            <span className="w-[38px] h-[38px] flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text)] rounded-full text-[13px] font-semibold">02</span>

            <div>
              <h2 className="text-[19px] min-[600px]:text-[22px] font-semibold text-[var(--text)] m-0">Shipping Information</h2>
              <p className="mt-1.5 mx-0 mb-0 text-[var(--text-muted)] text-sm">Where should we deliver your order?</p>
            </div>

          </div>


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="text"
              name="shippingFirstName"
              placeholder="First Name"
              value={formData.shippingFirstName}
              onChange={handleChange}
              required
            />

            <input
              className={inputClass}
              type="text"
              name="shippingLastName"
              placeholder="Last Name"
              value={formData.shippingLastName}
              onChange={handleChange}
              required
            />

          </div>


          <input
              className={inputClass}
              type="text"
            name="shippingPhone"
            placeholder="Shipping Phone Number"
            value={formData.shippingPhone}
            onChange={handleChange}
            required
          />


          <input
              className={inputClass}
              type="text"
            name="shippingAddress"
            placeholder="Street Address"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />


          <input
              className={inputClass}
              type="text"
            name="shippingApartment"
            placeholder="Apartment, Suite (Optional)"
            value={formData.shippingApartment}
            onChange={handleChange}
          />


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="text"
              name="shippingCity"
              placeholder="City"
              value={formData.shippingCity}
              onChange={handleChange}
              required
            />

            <input
              className={inputClass}
              type="text"
              name="shippingState"
              placeholder="State / Province"
              value={formData.shippingState}
              onChange={handleChange}
            />

          </div>


          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-0 min-[600px]:gap-4 w-full">

            <input
              className={inputClass}
              type="text"
              name="shippingZipCode"
              placeholder="ZIP / Postal Code"
              value={formData.shippingZipCode}
              onChange={handleChange}
            />

            <input
              className={inputClass}
              type="text"
              name="shippingCountry"
              placeholder="Country"
              value={formData.shippingCountry}
              onChange={handleChange}
              required
            />

          </div>

        </section>


        {/* =========================================
            PAYMENT INFORMATION
        ========================================= */}
        <section className="w-full pb-5 mb-[35px] border-b-0">

          <div className="flex items-center gap-[15px] mb-[25px]">

            <span className="w-[38px] h-[38px] flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text)] rounded-full text-[13px] font-semibold">03</span>

            <div>
              <h2 className="text-[19px] min-[600px]:text-[22px] font-semibold text-[var(--text)] m-0">Payment Method</h2>
              <p className="mt-1.5 mx-0 mb-0 text-[var(--text-muted)] text-sm">Select your preferred payment method</p>
            </div>

          </div>


          {/* PAYMENT OPTIONS */}
          <div className="flex flex-col gap-3 mt-2.5">


            {/* CASH ON DELIVERY */}
            <label
              className={`block border rounded-[14px] py-[14px] px-[14px] min-[600px]:py-[17px] min-[600px]:px-[18px] cursor-pointer transition-all duration-200 ease-in-out ${
                formData.paymentMethod === "Cash On Delivery"
                  ? "border-[var(--red)] bg-[var(--red-bg)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--red-border)]"
              }`}
            >

              <input
                className="hidden"
                type="radio"
                name="paymentMethod"
                value="Cash On Delivery"
                checked={
                  formData.paymentMethod === "Cash On Delivery"
                }
                onChange={handleChange}
              />

              <div className="flex items-center gap-[15px]">

                <div className="w-10 h-10 min-[600px]:w-[45px] min-[600px]:h-[45px] rounded-[10px] bg-[var(--bg-elevated-2)] flex items-center justify-center text-xl">
                  💵
                </div>

                <div>
                  <strong className="block text-[15px] font-semibold text-[var(--text)]">Cash On Delivery</strong>
                  <p className="mt-1 mx-0 mb-0 text-[var(--text-muted)] text-[13px]">Pay when your order arrives</p>
                </div>

              </div>

            </label>


            {/* DIGITAL WALLET */}
            <label
              className={`block border rounded-[14px] py-[14px] px-[14px] min-[600px]:py-[17px] min-[600px]:px-[18px] cursor-pointer transition-all duration-200 ease-in-out ${
                formData.paymentMethod === "Digital Wallet"
                  ? "border-[var(--red)] bg-[var(--red-bg)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--red-border)]"
              }`}
            >

              <input
                className="hidden"
                type="radio"
                name="paymentMethod"
                value="Digital Wallet"
                checked={
                  formData.paymentMethod === "Digital Wallet"
                }
                onChange={handleChange}
              />

              <div className="flex items-center gap-[15px]">

                <div className="w-10 h-10 min-[600px]:w-[45px] min-[600px]:h-[45px] rounded-[10px] bg-[var(--bg-elevated-2)] flex items-center justify-center text-xl">
                  📱
                </div>

                <div>
                  <strong className="block text-[15px] font-semibold text-[var(--text)]">Digital Wallet</strong>
                  <p className="mt-1 mx-0 mb-0 text-[var(--text-muted)] text-[13px]">EasyPaisa, JazzCash, NayaPay</p>
                </div>

              </div>

            </label>


            {/* BANK TRANSFER */}
            <label
              className={`block border rounded-[14px] py-[14px] px-[14px] min-[600px]:py-[17px] min-[600px]:px-[18px] cursor-pointer transition-all duration-200 ease-in-out ${
                formData.paymentMethod === "Bank Transfer"
                  ? "border-[var(--red)] bg-[var(--red-bg)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--red-border)]"
              }`}
            >

              <input
                className="hidden"
                type="radio"
                name="paymentMethod"
                value="Bank Transfer"
                checked={
                  formData.paymentMethod === "Bank Transfer"
                }
                onChange={handleChange}
              />

              <div className="flex items-center gap-[15px]">

                <div className="w-10 h-10 min-[600px]:w-[45px] min-[600px]:h-[45px] rounded-[10px] bg-[var(--bg-elevated-2)] flex items-center justify-center text-xl">
                  🏦
                </div>

                <div>
                  <strong className="block text-[15px] font-semibold text-[var(--text)]">Bank Transfer</strong>
                  <p className="mt-1 mx-0 mb-0 text-[var(--text-muted)] text-[13px]">Transfer payment directly to our bank</p>
                </div>

              </div>

            </label>


            {/* CARD */}
            <label
              className={`block border rounded-[14px] py-[14px] px-[14px] min-[600px]:py-[17px] min-[600px]:px-[18px] cursor-pointer transition-all duration-200 ease-in-out ${
                formData.paymentMethod === "Card"
                  ? "border-[var(--red)] bg-[var(--red-bg)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--red-border)]"
              }`}
            >

              <input
                className="hidden"
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={
                  formData.paymentMethod === "Card"
                }
                onChange={handleChange}
              />

              <div className="flex items-center gap-[15px]">

                <div className="w-10 h-10 min-[600px]:w-[45px] min-[600px]:h-[45px] rounded-[10px] bg-[var(--bg-elevated-2)] flex items-center justify-center text-xl">
                  💳
                </div>

                <div>
                  <strong className="block text-[15px] font-semibold text-[var(--text)]">Debit / Credit Card</strong>
                  <p className="mt-1 mx-0 mb-0 text-[var(--text-muted)] text-[13px]">Pay securely with your card</p>
                </div>

              </div>

            </label>

          </div>


          {/* =========================================
              DIGITAL WALLET DETAILS
          ========================================= */}
          {formData.paymentMethod === "Digital Wallet" && (

            <div className="mt-[18px] p-[22px] rounded-[14px] bg-[var(--bg-elevated-2)] border border-[var(--border)]">

              <h3 className="mt-0 mx-0 mb-[18px] text-[17px] text-[var(--text)]">Digital Wallet Details</h3>

              <select
                className={selectClass}
                name="wallet"
                value={formData.wallet}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Wallet
                </option>

                <option value="EasyPaisa">
                  EasyPaisa
                </option>

                <option value="JazzCash">
                  JazzCash
                </option>

                <option value="NayaPay">
                  NayaPay
                </option>

              </select>


              <input
              className={inputClass}
              type="text"
                name="accountNumber"
                placeholder="Wallet Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />


              <input
              className={inputClass}
              type="text"
                name="transactionId"
                placeholder="Transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
              />

            </div>

          )}


          {/* =========================================
              BANK TRANSFER DETAILS
          ========================================= */}
          {formData.paymentMethod === "Bank Transfer" && (

            <div className="mt-[18px] p-[22px] rounded-[14px] bg-[var(--bg-elevated-2)] border border-[var(--border)]">

              <h3 className="mt-0 mx-0 mb-[18px] text-[17px] text-[var(--text)]">Bank Transfer Details</h3>

              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl py-[15px] px-[18px] mb-[18px]">

                <p className="my-[7px] text-sm text-[var(--text-muted)]">
                  <strong className="text-[var(--text)]">Bank:</strong> Your Bank Name
                </p>

                <p className="my-[7px] text-sm text-[var(--text-muted)]">
                  <strong className="text-[var(--text)]">Account Title:</strong> TechHub
                </p>

                <p className="my-[7px] text-sm text-[var(--text-muted)]">
                  <strong className="text-[var(--text)]">Account Number:</strong> 0000000000
                </p>

                <p className="my-[7px] text-sm text-[var(--text-muted)]">
                  <strong className="text-[var(--text)]">IBAN:</strong> PK00XXXX00000000000000
                </p>

              </div>


              <select
                className={selectClass}
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Your Bank
                </option>

                <option value="HBL">
                  HBL
                </option>

                <option value="UBL">
                  UBL
                </option>

                <option value="Meezan Bank">
                  Meezan Bank
                </option>

                <option value="Bank Alfalah">
                  Bank Alfalah
                </option>

                <option value="MCB">
                  MCB
                </option>

              </select>


              <input
              className={inputClass}
              type="text"
                name="transactionId"
                placeholder="Transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
                required
              />

            </div>

          )}


          {/* =========================================
              CARD DETAILS
          ========================================= */}
          {formData.paymentMethod === "Card" && (

            <div className="mt-[18px] p-[22px] rounded-[14px] bg-[var(--bg-elevated-2)] border border-[var(--border)]">

              <h3 className="mt-0 mx-0 mb-[18px] text-[17px] text-[var(--text)]">Card Payment</h3>

              <p className="m-0 text-[var(--text-muted)] text-sm leading-[1.6]">
                You will be redirected to our secure
                payment gateway after placing the order.
              </p>

            </div>

          )}

        </section>


        {/* =========================================
            SUBMIT BUTTON
        ========================================= */}
        <button
          type="submit"
          className="w-full h-[58px] border-none rounded-[30px] bg-[var(--red)] text-white text-base font-semibold cursor-pointer transition-all duration-[250ms] ease-in-out mt-[5px] hover:bg-[var(--red-hover)] hover:shadow-[var(--shadow-red)] hover:-translate-y-px disabled:opacity-[0.55] disabled:cursor-not-allowed disabled:translate-y-0"
          disabled={cart.length === 0 || loading}
        >

          {loading
            ? "Order Place ho raha hai..."
            : `Place Order — ${formatPrice(total)}`}

        </button>


        {/* SECURITY NOTE */}
        <p className="text-center text-[var(--text-muted)] text-[13px] mt-[15px] mx-0 mb-0 leading-[1.5]">
          🔒 Aapki details secure hain, order confirm hone
          ke baad hum aapse contact karenge.
        </p>


        {/* ERROR */}
        {error && (
          <p className="text-[var(--red)] bg-[var(--red-bg)] border border-[var(--red-border)] py-3 px-[15px] rounded-[10px] text-sm mt-[15px]">
            {error}
          </p>
        )}

      </form>


      {/* =========================================
          ORDER SUMMARY
      ========================================= */}
      <div className="w-full min-[900px]:flex-1 min-[900px]:min-w-[300px] bg-[var(--bg-card)] border border-[var(--border)] rounded-[18px] p-[25px] box-border static min-[900px]:sticky min-[900px]:top-5">

        <h2 className="mt-0 mx-0 mb-[22px] text-xl text-[var(--text)]">
          Order Summary
          <span className="text-[var(--text-dim)] text-sm font-normal">
            ({itemCount} items)
          </span>
        </h2>


        <div className="flex flex-col gap-4 mb-5">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-3 pb-[15px] border-b border-[var(--border)]"
            >

              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
              />


              <div className="flex-1 min-w-0">

                <p className="mt-0 mx-0 mb-[5px] text-sm font-semibold text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.name}
                </p>

                <p className="m-0 text-[var(--text-dim)] text-xs">
                  Qty: {item.quantity}
                </p>

              </div>


              <p className="m-0 text-sm font-semibold text-[var(--text)] whitespace-nowrap">
                {formatPrice(
                  item.price * item.quantity
                )}
              </p>

            </div>

          ))}

        </div>


        <div className="flex justify-between py-2.5 text-[var(--text-muted)] text-sm">

          <span>Subtotal</span>

          <span>
            {formatPrice(total)}
          </span>

        </div>


        <div className="flex justify-between py-2.5 text-[var(--text-muted)] text-sm">

          <span>Delivery</span>

          <span>Free</span>

        </div>


        <h3 className="flex justify-between items-center border-t border-[var(--border)] pt-[18px] mt-2.5 text-lg text-[var(--text)]">

          Total

          <span>
            {formatPrice(total)}
          </span>

        </h3>

      </div>

    </div>
  );
}