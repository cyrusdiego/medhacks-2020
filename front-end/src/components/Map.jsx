import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 53.54,
          lng: -113.49,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmSYG-wJ82zCvH4nOdsa4v1q8lNWTQ0JA',
})(MapContainer);
