import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/ThemeContext";

//checkout
const CheckoutForm = ({ cart }) => {
  const { isDarkMode } = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // Updated state for total price

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total price from the cart!!
    if (cart.length > 0) {
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  useEffect(() => {
    if (totalPrice <= 0) {
      console.error('Invalid price value. Must be greater than 0.');
      return;
    }

    axiosSecure.post('https://poznanski.onrender.com/create-payment-intent', { price: totalPrice })
      .then(res => {
        console.log(res.data.clientSecret);
        console.log(totalPrice);
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error('Error creating payment intent:', error);
      });
  }, [totalPrice, axiosSecure]);

  // handleSubmit btn click
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // console.log('card: ', card)
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
      return;
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
          },
        },
      },
    );

    if(confirmError){
      console.log(confirmError);
      return;
    }

    console.log('paymentIntent', paymentIntent);

    if(paymentIntent.status === "succeeded") {
      const transitionId = paymentIntent.id;
      setCardError(`Your transaction ID is: ${transitionId}`);

      // save payment info to server
      const paymentInfo = {
        email: user.email,
        transitionId,
        price: totalPrice,
        quantity: cart.length,
        status: "order pending",
        itemsName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        menuItems: cart.map(item => item.menuItemId),
      };

      // send payment info
      axiosSecure.post('https://poznanski.onrender.com/payments', paymentInfo)
        .then(res => {
          if (res.data) {
            alert('Payment info sent successfully!');
            navigate('/order');
          }
        })
        .catch(error => {
          console.error('Error saving payment info:', error);
        });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: PLN {totalPrice.toFixed(2)}</p> {/* Display total price */}
        <p>Number of Items: {cart.length}</p>
      </div>
      <div className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 ${isDarkMode ? 'dark' : ''}`}>
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-primary btn-sm mt-5 w-full"
          >
            Pay
          </button>
        </form>
        {cardError ? <p className="text-red text-xs italic">{cardError}</p> : ''}
        <div className="mt-5 text-center"></div>
      </div>
    </div>
  );
};

export default CheckoutForm;
