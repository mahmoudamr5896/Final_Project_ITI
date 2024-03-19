import React, { useState, useEffect } from 'react';

const PaymentForm = ({ appointmentId }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expire, setExpire] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');

  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/payments/');
        const data = await response.json();
        const uniqueCardNumbers = Array.from(new Set(data.map(payment => payment.card_number)));
        const cardNumbers = uniqueCardNumbers.map(cardNumber => {
          const last8Digits = cardNumber.slice(-8);
          return {
            fullCardNumber: cardNumber,
            displayCardNumber: `Card ending in ${last8Digits}`
          };
        });
        setSavedCards(cardNumbers);
      } catch (error) {
        console.error('Error fetching saved cards:', error);
      }
    };

    fetchSavedCards();
  }, []);

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
          card_number: selectedCard ? selectedCard.fullCardNumber : cardNumber,
          expire: expire,
          security_code: securityCode,
          amount: parseFloat(amount),
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Payment successful!', responseData);
        setSuccessMessage('Correct info your payment process now under review ');
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
        <img src="https://w7.pngwing.com/pngs/363/177/png-transparent-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment-logo.png" alt="Visa Logo" style={{ height: '30px' }} />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {selectedCard ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="text"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-sm">Pay with Saved Card</button>
          </div>
        </form>
      ) : (
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
                <label>CVV:</label>
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
      )}
      <div className="text-center mt-3">
        <div className="or-divider">OR</div>
        {savedCards.length > 0 && (
          <div>
            <h5>Select a saved card to pay:</h5>
            {savedCards.map((card, index) => (
              <button
                key={index}
                className="btn btn-outline-secondary m-1"
                onClick={() => setSelectedCard(card)}
              >
                {card.displayCardNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
