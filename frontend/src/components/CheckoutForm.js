import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
    if (error) {
      setError(error.message);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/payments/charge', {
        amount: 5000, // amount in cents
        source: token.id,
        receipt_email: 'customer@example.com',
      });
      setSuccess('Payment successful!');
    } catch (err) {
      setError('Payment failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
}

export default CheckoutForm;
