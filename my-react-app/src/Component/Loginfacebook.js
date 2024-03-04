import React from 'react';
import FacebookLogin from 'react-facebook-login';

function FacebookButton() {
  const responseFacebook = (response) => {
    console.log(response);
    // Handle the response here, such as sending the access token to your server for authentication
  };

  return (
    <FacebookLogin
      appId="YOUR_APP_ID"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
}

export default FacebookButton;
