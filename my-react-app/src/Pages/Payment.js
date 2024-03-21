import React, { useState, useEffect } from 'react';
import PayPalCheckoutButton from '../Component/PayPal';

const PaymentForm = ({ appointmentId }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expire, setExpire] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPaid, setIsPaid] = useState(false); // State to indicate if appointment is paid
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to toggle payment form visibility

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        // Fetch payment information for the appointment
        const response = await fetch(`http://127.0.0.1:8000/payments/?appointment_id=${appointmentId}`);
        const paymentData = await response.json();
        if (paymentData.length > 0) {
          // Appointment is paid
          setIsPaid(true);
        }
      } catch (error) {
        console.error('Error fetching payment information:', error);
      }
    };

    fetchPaymentInfo();
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the appointment has already been paid
      const paymentCheckResponse = await fetch(`http://127.0.0.1:8000/payments/?appointment_id=${appointmentId}`);
      const paymentCheckData = await paymentCheckResponse.json();

      if (paymentCheckData.length > 0) {
        setError('Appointment has already been paid.');
        return;
      }

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
        setSuccessMessage('Your payment was successful and is now under review.');
        setAmount('');
        setError('');
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
      <h2 className="text-center mb-4" style={{ fontFamily: "fantasy" }}>Enter Card Information</h2>
      <div className="text-center mt-4">
        <br></br>
        <img src="https://w7.pngwing.com/pngs/363/177/png-transparent-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment-logo.png" alt="Visa Logo" style={{ height: '30px' }} />
      <br></br><br></br>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit} style={{ display: showPaymentForm ? 'block' : 'none' }}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Card Number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter card number"
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
                placeholder="MM/YYYY"
                value={expire}
                onChange={(e) => setExpire(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>CVV:</label>
              <input
                type="text"
                className="form-control"
                placeholder="CVV"
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
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm" style={{ width: "15%", fontFamily: "cursive", fontSize: "100%" }}>Submit Payment</button>
        </div>
      </form>
      <div className="text-center">
        <button className="btn btn-primary btn-sm" style={{ width: "15%", fontFamily: "cursive", fontSize: "100%", marginBottom: '20px' }} onClick={() => setShowPaymentForm(!showPaymentForm)}>
          {showPaymentForm ? 'Hide Payment Form' : 'Show Payment Form'}
        </button>
      </div>
      {/* PayPal Checkout Button */}
      <br></br><hr></hr>
      <h2 className="text-center">OR</h2>
      <p className="text-center">Pay Using PayPal</p>
      <div className="payment-form container border rounded p-4 shadow d-flex justify-content-center align-items-center" style={{ display: showPaymentForm ? 'none' : 'block' }}>
        <PayPalCheckoutButton
          amount={parseFloat(amount)} // Convert amount to a number
          onSuccess={(order) => {
            
            // Handle PayPal payment success
            console.log('PayPal payment successful:', order);
            setSuccessMessage('PayPal payment successful');
            setAmount('');
            setError('');
          }}
          onError={(err) => {

            // Handle PayPal payment error
            console.error('PayPal payment failed:', err);
            setError('PayPal payment failed');
          }}
        />
      </div>
    </div>
  );
};
export default PaymentForm;
