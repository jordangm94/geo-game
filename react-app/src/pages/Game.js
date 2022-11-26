import React, {useState, useRef} from 'react';
import BingMapsReact from "bingmaps-react";

import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap } from 'react-leaflet/hooks';

export default function Game() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef()
  return (
    <>
    <div ref={mapRef}>Hello World</div>
    <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>

      
    <BingMapsReact
      onMapReady={() => {setIsMapLoaded(true)}}
      bingMapsKey="AvbDxkEoBBjb3rv1rfFWxUKJSLPGi8yLYCP9VC02-dgCUeDnDFg4-LCP4y16Nz-g"
      height="1000px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="1000px"
      viewOptions={{
        center: { latitude: 42.360081, longitude: -71.058884 },
        mapTypeId: "streetside",
        streetsideOptions: { showExitButton: false, showCurrentAddress: false }
      }}
    />
    </>
  );
}