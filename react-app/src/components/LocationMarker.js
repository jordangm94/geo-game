import { Marker, useMapEvents } from 'react-leaflet';

//This component will set a marker on the map wherever the user clicks
export default function LocationMarker(props) {

  const map = useMapEvents({
    //Once user click event happens, set position to the lat and long of where they clicked on map
    click(event) {
      props.setPosition(event.latlng);
      map.flyTo(event.latlng);
    }
  });
  //If position has been set by user, return marker component which will mark the map
  return props.position === null ? null : (
    <Marker position={props.position}>
    </Marker>
  );
}
