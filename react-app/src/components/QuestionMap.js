import React, { useState } from 'react';
import BingMapsReact from "bingmaps-react";

//This component houses the Bing Map, which show the player a random place on earth in which they will have to guess where they are.
export default function QuestionMap(props) {
  //Store BING API key in a variable and plug into component
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <BingMapsReact
      onMapReady={() => { setIsMapLoaded(true); }}
      bingMapsKey={API_KEY}
      height="100vh"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="100vh"
      //Add key to component so that when lat and long change with turn state, so does key. Map component with old key will be removed entirley from DOM and map component with new key (using new lat long) is freshly mounted. This allows maps to change correctly!
      key={`${props.turn.latitude}-${props.turn.longitude}`}//Apply key in order to remount new map component each time latitude and longitude change.
      viewOptions={{
        center: { latitude: props.turn.latitude, longitude: props.turn.longitude },
        mapTypeId: "streetside",
        // The pathway for overview map mode is defined as Microsoft.Maps.OverviewMapMode.hidden. Value at the end is 2. Simply used this number as key value to avoid conflicts and use of scripts for keys like "Microsoft" and "Maps"
        streetsideOptions: { showExitButton: false, showCurrentAddress: false, overviewMapMode: 2 }
      }}
    />
  );
}