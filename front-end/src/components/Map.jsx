import React, { useEffect, useRef } from 'react';
import axios from 'axios';

// Variables
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_API_KEY;
const myLocation = {
  // Edmonton
  lat: 53.54,
  lng: -113.49,
};
// styles
const mapStyles = {
  width: '100%',
  height: '900px',
};

const testServer = () => {
  return axios('http://localhost:3001/test', {
    method: 'GET',
  });
};

function GoogleMaps(props) {
  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);

  // helper functions
  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
    });

  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: myLocation.lat, lng: myLocation.lng },
      map: googleMap.current,
    });

  // useEffect Hook
  useEffect(() => {
    testServer().then((resp) => {
      console.log(resp);
    });
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      googleMap.current = createGoogleMap();
      // marker.current = createMarker();
    });
  });

  return <div id='google-map' ref={googleMapRef} style={mapStyles} />;
}

export default GoogleMaps;
