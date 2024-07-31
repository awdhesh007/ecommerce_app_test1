import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PhedeB4o8Eeo4NmeeWepPs9rt6P2u3tq3IIi8UMf5c1MObzyn3SLexkz5WOILd6hl9dkPryiAgQ7qRCAaaNRGzF00PzjTBCb0');

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-payment-intent`, { amount: 1000 }); // Example amount: $10
      setClientSecret(data.clientSecret);
    };
    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error('Payment failed:', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent);
      // Handle post-payment success (e.g., redirect, show confirmation, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );


  return (
    <div>
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Checkout;
