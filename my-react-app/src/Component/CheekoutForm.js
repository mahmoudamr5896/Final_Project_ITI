import React from 'react';
import { useState,state } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const CheckoutForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [validCardNumber, setValidCardNumber] = useState(true);

  const [cardholderName, setCardholderName] = useState('');
  const [validCardholderName, setValidCardholderName] = useState(true);

  const [startDate, setStartDate] = useState('');
  const [validStartDate, setValidStartDate] = useState(true);

  const [expirationDate, setExpirationDate] = useState('');
  const [validExpirationDate, setValidExpirationDate] = useState(true);

  const [cvv, setCvv] = useState('');
  const [validCvv, setValidCvv] = useState(true);

  const[submit,setsubmit]=useState('')

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);
    setValidCardNumber(validateCardNumber(value));
  };

  const handleCardholderNameChange = (e) => {
    const value = e.target.value;
    setCardholderName(value);
    setValidCardholderName(validateCardholderName(value));
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setValidStartDate(validateStartDate(value));
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    setExpirationDate(value);
    setValidExpirationDate(validateExpirationDate(value));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    setValidCvv(validateCvv(value));
  };

  const validateCardNumber = (value) => {
    return /^\d{16}$/.test(value);
  };

  const validateCardholderName = (value) => {
    return /^[a-zA-Z\s]+$/.test(value);
  };

  const validateStartDate = (value) => {
    return /^[0-9]{1,2}\/[0-9]{4}$/.test(value);
  };

  const validateExpirationDate = (value) => {
    return /^[0-9]{1,2}\/[0-9]{4}$/.test(value);
  };

  const validateCvv = (value) => {
    return /^\d{3,4}$/.test(value);
  };

const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable
const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();

    const isCardNumberValid = validateCardNumber(cardNumber);
    const isCardholderNameValid = validateCardholderName(cardholderName);
    const isStartDateValid = validateStartDate(startDate);
    const isExpirationDateValid = validateExpirationDate(expirationDate);
    const isCvvValid = validateCvv(cvv);
    if (isCardNumberValid && isCardholderNameValid && isStartDateValid && isExpirationDateValid && isCvvValid) {
      console.log('Form is valid. Proceed with payment.');
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
              history.push('/')
      }, 2000);
    } else {
      console.log('Form has validation errors. Cannot proceed with payment.');
    }
  };




// handell add cobun 

  return (

    <div className="container" >
      <form className="form-card border border-3 p-3" onSubmit={handleSubmit}>
        <div className="row">
           <div className="row main">
             <div className="col-12">
               <span>Cart</span>&nbsp;&nbsp;&nbsp;&nbsp;
               <span>Shipping confirmation</span>&nbsp;&nbsp;&nbsp;&nbsp;
               <span>Credit card checkout</span>
            </div>
          </div>

           <div className="row justify-content-center mrow">
             <div className="col-12">
               <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" width="35px" height="35px" alt="Mastercard" />
               <img src="https://img.icons8.com/color/48/000000/visa.png" width="35px" height="35px" alt="Visa" />
               <img src="https://img.icons8.com/color/48/000000/paypal.png" width="35px" height="35px" alt="Paypal" />
             </div>
           </div>
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className={`form-control p-0 ${!validCardNumber && 'is-invalid'}`}
                id="number"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              <label className="form-control-placeholder p-0" htmlFor="number">
                Card Number
              </label>
              {!validCardNumber && <div className="invalid-feedback">Invalid card number</div>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className={`form-control p-0 ${!validCardholderName && 'is-invalid'}`}
                id="name"
                required
                value={cardholderName}
                onChange={handleCardholderNameChange}
              />
              <label className="form-control-placeholder p-0" htmlFor="name">
                Cardholder's Name
              </label>
              {!validCardholderName && <div className="invalid-feedback">Invalid cardholder name</div>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-12">
            <div className="form-group">
              <input
                type="text"
                className={`form-control p-0 ${!validStartDate && 'is-invalid'}`}
                id="sdate"
                required
                value={startDate}
                onChange={handleStartDateChange}
              />
              <label className="form-control-placeholder p-0" htmlFor="sdate">
                Start Date
              </label>
              {!validStartDate && <div className="invalid-feedback">Invalid start date</div>}
            </div>
          </div>
          <div className="col-sm-4 col-12">
            <div className="form-group">
              <input
                type="text"
                className={`form-control p-0 ${!validExpirationDate && 'is-invalid'}`}
                id="expdate"
                required
                value={expirationDate}
                onChange={handleExpirationDateChange}
              />
              <label className="form-control-placeholder p-0" htmlFor="expdate">
                Expiration Date
              </label>
              {!validExpirationDate && <div className="invalid-feedback">Invalid expiration date</div>}
            </div>
          </div>
          <div className="col-sm-4 col-12">
            <div className="form-group">
              <input
                type="password"
                className={`form-control p-0 ${!validCvv && 'is-invalid'}`}
                id="passw"
                required
                value={cvv}
                onChange={handleCvvChange}
              />
              <label className="form-control-placeholder p-0" htmlFor="passw">
                CVV
              </label>
              {!validCvv && <div className="invalid-feedback">Invalid CVV</div>}
            </div>
          </div>
        </div>
        <div className="row lrow mt-4 mb-3">
          <div className="col-sm-8 col-12">
            <h3>Grand Total:</h3>
          </div>
          <div className="col-sm-4 col-12">
            <h5></h5>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary btn-block">
              Pay
            </button>
            {showSuccessMessage && (
          <div className="alert alert-success" role="alert">
            Payment successful! You will be redirected shortly.
          </div>
        )}
          </div>
        </div>
      </form>
    </div>
    
  );
};

export default CheckoutForm;