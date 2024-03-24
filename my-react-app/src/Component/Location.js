import React, { useState } from 'react';

const LocationFetcher = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState('');

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLatitude(lat);
          setLongitude(long);
          updateMapUrl(lat, long);
          openGoogleMaps();
        },
        error => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const updateMapUrl = (lat, long) => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    setMapUrl(url);
  };

  const openGoogleMaps = () => {
    if (mapUrl) {
      // Open Google Maps in a new tab
    //   window.open(mapUrl, '_blank');
    } else {
      console.error('Map URL is not available.');
    }
  };

  const handleLatitudeChange = event => {
    const newLat = event.target.value;
    setLatitude(newLat);
    updateMapUrl(newLat, longitude);
  };

  const handleLongitudeChange = event => {
    const newLong = event.target.value;
    setLongitude(newLong);
    updateMapUrl(latitude, newLong);
  };
console.log(mapUrl)
  return (
    <div>
      <button onClick={fetchLocation}>Get Current Location</button>
      {/* {latitude !== null && longitude !== null && (
        <div>
          <p>Latitude: {latitude}</p>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={handleLatitudeChange}
          />
          <p>Longitude: {longitude}</p>
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={handleLongitudeChange}
          /> 
           <button onClick={openGoogleMaps}>Find Us on Google Maps</button> 
        </div>
      )}*/}
    </div>
  );
};

export default LocationFetcher;
