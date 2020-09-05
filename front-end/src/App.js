import React from 'react';
import { SimpleMap } from './components/Map';
import './App.css';

export const App = () => {
  const mapProps = {
    // Edmonton
    center: {
      lat: 53.54,
      lng: -113.49,
    },
    zoom: 11,
  };

  return (
    <div className='App' width='50' height='50'>
      <SimpleMap center={mapProps.center} zoom={mapProps.zoom} />
    </div>
  );
};
