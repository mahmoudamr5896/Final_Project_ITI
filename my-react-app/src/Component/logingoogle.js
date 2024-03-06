import React from 'react';
import { GoogleLogin } from 'react-google-login';

function GoogleButton() {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response here, such as sending the ID token to your server for authentication
  };

  return (
    <GoogleLogin
      clientId="YOUR_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleButton;
