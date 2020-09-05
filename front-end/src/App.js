import React from 'react';
import GoogleApiWrapper from './components/Map';
import './App.css';

export const App = () => {
  return (
    <div className='App' width='50' height='50'>
      <GoogleApiWrapper />
    </div>
  );
};
