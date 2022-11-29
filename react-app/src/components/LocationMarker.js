import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

export default function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(event) {
      setPosition(event.latlng)
      console.log(event.latlng)
    }
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
