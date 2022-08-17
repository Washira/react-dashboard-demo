import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Locations from '../components/Locations'

const iconDisplay = (data) => {
  if (data.date === new Date().getDay()) {
    return {
      url: '/icons/location-pin.png',
      scaledSize: new window.google.maps.Size(25, 25)
    }
  } else if (data.date > new Date().getDay()) {
    return {
      url: '/icons/location.png',
      scaledSize: new window.google.maps.Size(25, 25)
    }
  } else {
    return {
      url: '/icons/ok.png',
      scaledSize: new window.google.maps.Size(25, 25)
    }
  }
}

function Maps() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <div>
      <GoogleMap
        defaultZoom={10} // 14
        defaultCenter={{ lat: 12.6500000, lng: 101.5000000 }} //12.656862897007752, 101.63524095779566
      >
        {Locations.map((data) => (
          <Marker
            key={data.lat}
            position={{ lat: data.lat, lng: data.lng }}
            onClick={() => setSelectedLocation(data)}
            icon={iconDisplay(data)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.name}</h2>
              <h4>วันที่ไป : {selectedLocation.workDay}</h4>
              <div>พิกัด : {selectedLocation.lat}, {selectedLocation.lng}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Maps));

export default WrappedMap;