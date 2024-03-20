import React, { useEffect } from 'react';

const PayPalCheckoutButton = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=Acf2GEHZcjy1PZADQBy8QSfOYFzf4Awc5VFhzVnS5YNotcFXUd0RT05lQ5XZderQfWB8wmeFtmu0qhEB`;
        script.addEventListener('load', () => {
            // Ensure PayPal script is loaded before rendering buttons
            if (window.paypal && window.paypal.Buttons) {
                window.paypal.Buttons().render('#paypal-button-container');
            } else {
                console.error('PayPal SDK not initialized properly');
            }
        });
        script.addEventListener('error', (error) => {
            console.error('Error loading PayPal SDK script:', error);
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="paypal-button-container"></div>
    );
};

export default PayPalCheckoutButton;
