import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NvpLtLqE2YUEVNIRlDJRtHrhFWwSlvSt2XQ7sBSMMh03tXKBxuw9OFmZa6hsdfjQXrSNYxflAPe5exJBfEh6Caj00JfQLYmED');

const DonationForm = () => {
    const [donationAmount, setDonationAmount] = useState(10); // Default donation amount
    const elements = useElements();
    const stripe = useStripe();
    const [paymentIsSuccessful, setPaymentIsSuccessful] = useState(false); // State to track payment success
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        return;
      }
  
      // Create a payment method with the card information.
      const cardElement = elements.getElement(CardElement);
  
      const { token, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        console.error(error);
      } else {
        // Send the payment token to your server for processing.
        console.log(token);
        // Check if the payment was successful
        if (token) {
          setPaymentIsSuccessful(true);
        }
      }
    };
  
    return (
      <div>
        <h2>Make a Donation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Donation Amount ($)</label>
            <input
              type="number"
              min="1"
              step="1"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Card Details</label>
            <CardElement options={{ style: { base: { fontSize: '16px' } }} } />
          </div>
          <button type="submit">Donate</button>
        </form>
        {paymentIsSuccessful && (
          <div className="success-message">
            Payment was successful! Thank you for your donation.
          </div>
        )}
      </div>
    );
  };
  

const DonationPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
};

export default DonationPage;
