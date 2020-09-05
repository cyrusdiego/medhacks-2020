import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import * as dotenv from 'dotenv';
dotenv.config();

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        // Edmonton
        initialCenter={{
          lat: 53.54,
          lng: -113.49,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
