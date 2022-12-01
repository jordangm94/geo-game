import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "./AnswerMap.css";
import LocationMarker from './LocationMarker';


//This component houses the Leaflet map, which the player will use to naviagate the world and input/guess their location with the click of the mouse.
export default function AnswerMap(props) {
  const mapRef = useRef();

  return (
    <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={props.position} setPosition={props.setPosition} />
    </MapContainer>
  );
}