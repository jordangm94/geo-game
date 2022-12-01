import React, { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

//This component will set a marker on the map wherever the user clicks
export default function LocationMarker() {
  
  //Set position state as null to begin
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    //Once user click event happens, set position to the lat and long of where they clicked on map
    click(event) {
      setPosition(event.latlng)
      map.flyTo(event.latlng)
      console.log(event.latlng)
    }
  })
  //If position has been set by user, return marker component which will mark the map
  return position === null ? null : (
    <Marker position={position}>
    </Marker>
  )
}
