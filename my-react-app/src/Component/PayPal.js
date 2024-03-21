import React, { useEffect } from 'react';

const PayPalCheckoutButton = ({ amount, onSuccess }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=Ac33URymejOEqeyKbbCIB9ZBp2q9Yf1LTtUV7-mSyQrFWls4w40cgFN7H96P2Bh8GyLa0GY1lKrzIz2V`;
    script.addEventListener('load', () => {
      // Ensure PayPal script is loaded before rendering buttons
      if (window.paypal && window.paypal.Buttons) {
        window.paypal.Buttons().render('#paypal-button-container').then(() => {
          // Success
          console.log('PayPal buttons rendered successfully');
        }).catch((error) => {
          // Error handling for button rendering
          console.error('Error rendering PayPal buttons:', error);
        });
      } else {
        console.error('PayPal SDK not initialized properly or Buttons component not available');
      }
    });
    script.addEventListener('error', (error) => {
      console.error('Error loading PayPal SDK script:', error);
    });
    document.body.appendChild(script);

    // Cleanup logic
    return () => {
      // Check if the script element exists before attempting to remove it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalCheckoutButton;
