import React from 'react';
import Map from './Maps';

function MapApp() {
  return (
    <div style={{ width: '100vw', height: '60vh' }}>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
        libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  )
};

export default MapApp;