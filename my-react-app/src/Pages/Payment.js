import React, { useState } from 'react';

const PaymentForm = ({ appointmentId }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expire, setExpire] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/payments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          card_number: cardNumber,
          expire: expire, // Ensure this matches the format expected by Django (e.g., MM/YYYY)
          security_code: securityCode,
          amount: parseFloat(amount),
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Payment successful!', responseData);
        setSuccessMessage('Your data entered succefully it is under review now ');
        // Clear form fields
        setCardNumber('');
        setExpire('');
        setSecurityCode('');
        setAmount('');
      } else {
        console.error('Payment failed:', responseData);
        setError('Payment failed: ' + responseData.detail);
      }
    } catch (err) {
      console.error('Error submitting payment:', err);
      setError('Error submitting payment');
    }
  };

  return (
    <div className="payment-form" style={{ marginTop: '10%' }}>
      <h2>Enter Card Information</h2>
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <label>
          Expiry Date (MM/YYYY):
          <input
            type="text"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
          />
        </label>
        <label>
          Security Code:
          <input
            type="text"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
