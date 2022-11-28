import React, {useRef} from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "./AnswerMap.css"

//This component houses the Leaflet map, which the player will use to naviagate the world and input/guess their location with the click of the mouse.
export default function AnswerMap() {
  const mapRef = useRef();

  return (
    <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}