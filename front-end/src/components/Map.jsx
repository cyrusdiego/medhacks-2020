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
  return axios('http://localhost:3001/getTable', {
    method: 'GET',
  });
};

function GoogleMaps(props) {
  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);
  const heatMap = useRef(null);

  // helper functions
  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
      // styles: [
      //   { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      //   { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      //   { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      //   {
      //     featureType: 'administrative.locality',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#d59563' }],
      //   },
      //   {
      //     featureType: 'poi',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#d59563' }],
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'geometry',
      //     stylers: [{ color: '#263c3f' }],
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#6b9a76' }],
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry',
      //     stylers: [{ color: '#38414e' }],
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry.stroke',
      //     stylers: [{ color: '#212a37' }],
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#9ca5b3' }],
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry',
      //     stylers: [{ color: '#746855' }],
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry.stroke',
      //     stylers: [{ color: '#1f2835' }],
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#f3d19c' }],
      //   },
      //   {
      //     featureType: 'transit',
      //     elementType: 'geometry',
      //     stylers: [{ color: '#2f3948' }],
      //   },
      //   {
      //     featureType: 'transit.station',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#d59563' }],
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'geometry',
      //     stylers: [{ color: '#17263c' }],
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.fill',
      //     stylers: [{ color: '#515c6d' }],
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.stroke',
      //     stylers: [{ color: '#17263c' }],
      //   },
      // ],
    });

  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: myLocation.lat, lng: myLocation.lng },
      map: googleMap.current,
    });

  const getPoints = (building) => {
    const coords = building.rows[0].center;
    return [
      {
        location: new window.google.maps.LatLng(
          coords.latitude,
          coords.longitude
        ),
        weight: 10,
        radius: 10,
        opacity: 1,
      },
    ];
  };
  const createHeatMap = (building, googleMap) => {
    const points = getPoints(building);
    return new window.google.maps.visualization.HeatmapLayer({
      data: points,
      map: googleMap,
    });
  };

  // useEffect Hook
  useEffect(() => {
    let building;
    testServer().then((resp) => {
      building = resp.data;
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=visualization`;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener('load', () => {
        googleMap.current = createGoogleMap();
        heatMap.current = createHeatMap(building, googleMap.current);
      });
    });
  });

  return <div id='google-map' ref={googleMapRef} style={mapStyles} />;
}

export default GoogleMaps;
