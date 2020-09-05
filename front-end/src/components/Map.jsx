import React from 'react';
import GoogleMapReact from 'google-map-react';

export const SimpleMap = (props) => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCmSYG-wJ82zCvH4nOdsa4v1q8lNWTQ0JA' }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      />
    </div>
  );
};
