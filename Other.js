import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as restData from './restaurants-toronto.json';

function Map() {
  const [selectedRest, setSelectedRest] = useState(null);

    return (
      <div>
        <GoogleMap 
          defaultZoom={14} 
          defaultCenter={{lat: 43.651890, lng:  -79.381706}}
        >
          {restData.list.map(rest => (   
            <Marker 
              key={rest.address} 
              position={{
                lat: rest.COORDINATES[0],
                lng: rest.COORDINATES[1]
              }}
              onClick={() => {
                  setSelectedRest(rest);
              }}  
           />
          ))}

          {selectedRest && (
            <InfoWindow
              position={{
                lat: selectedRest.COORDINATES[0],
                lng: selectedRest.COORDINATES[1]
              }}
              onCloseClick={() => {
                setSelectedRest(null);
              }}
            >
              <div>
                <h4>{selectedRest.NAME}</h4>
                <h6>Address: {selectedRest.ADDRESS}</h6>
                <h6>Contact: {selectedRest.PHONE}</h6>
                <hr></hr>
                <p><strong>Goods Sold:</strong></p> 
                {selectedRest.ITEMS.map(item => (<p>- {item}</p>))}
              </div>
            </InfoWindow> 
          )} 
        </GoogleMap>
      </div>
    );
  } 

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Other() {
  return (
    <div style={{ width: "100vw", height: "92vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}