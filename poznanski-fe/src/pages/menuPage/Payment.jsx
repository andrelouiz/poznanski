import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Payment = () => {
  const [cart, setCart] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price when cart changes
  useEffect(() => {
    // Ensure cart is not empty
    if (cart.length > 0) {
      // Calculate the total price of all items in the cart
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(parseFloat(total.toFixed(2)));
    }
  }, [cart]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        {/* Pass totalPrice and cart to CheckoutForm */}
        <CheckoutForm totalPrice={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
