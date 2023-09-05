import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { getToken } from "../../Shared/Components/utilities";
import useUser from "../../Hooks/useUser";
import { toast } from "react-toastify";
import useCart from "../../Hooks/useCart";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const token = getToken();
  const [userInfo] = useUser();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (price > 0) {
      fetch("https://electrix-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [price, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userInfo.displayName,
            email: userInfo.email,
          },
        },
      });
    if (confirmationError) {
      setCardError(confirmationError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const orders = {
        products: cart,
        totalAmount: price,
        transsactionId: paymentIntent.id,
        email: userInfo.email,
        phone: userInfo.phone,
      };
      fetch("https://electrix-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orders),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // clear cart after completeing payment //
            fetch(
              `https://electrix-server.vercel.app/clear-cart?email=${userInfo.email}`,
              {
                method: "DELETE",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.acknowledged) {
                  toast.success(`Your payment completed successfully !
                  Transaction Id: ${paymentIntent.id}`);
                  navigate("/");
                }
              });
          }
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#fff",
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
          className="btn btn-sm btn-primary text-white mt-4"
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </>
  );
};

export default CheckoutForm;
