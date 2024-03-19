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
          expire: expire,
          security_code: securityCode,
          amount: parseFloat(amount),
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Payment successful!', responseData);
        setSuccessMessage('Your data entered successfully. It is under review now.');
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
    <div className="payment-form container border rounded p-4 shadow">
      <h2 className="text-center mb-4" style={{fontFamily:"fantasy"}}>Enter Card Information</h2>
      <div className="text-center mt-4">
        <img src="https://w7.pngwing.com/pngs/363/177/png-transparent-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment-logo.png" alt="Visa Logo" style={{ height: '30px' }} />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Card Number:</label>
              <input
                type="text"
                className="form-control"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Expiry Date (MM/YYYY):</label>
              <input
                type="text"
                className="form-control"
                value={expire}
                onChange={(e) => setExpire(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Security Code:</label>
              <input
                type="text"
                className="form-control"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Amount:</label>
              <input
                type="text"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm">Submit Payment</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
