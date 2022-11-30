import React, { useState } from 'react';
import BingMapsReact from "bingmaps-react";

//This component houses the Bing Map, which show the player a random place on earth in which they will have to guess where they are.
export default function QuestionMap(props) {
  
  const API_KEY = process.env.REACT_APP_API_KEY
  //Can remove this line at end of project, simply for testing
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // let Microsoft = window.Microsoft;

  return (
    <BingMapsReact
      onMapReady={() => { setIsMapLoaded(true); }}
      bingMapsKey={API_KEY}
      height="100vh"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="100vh"
      viewOptions={{  
        center: { latitude: 51.501073,  longitude:  -0.123975  },
        mapTypeId: "streetside",
        // The pathway for overview map mode is defined as Microsoft.Maps.OverviewMapMode.hidden. Value at the end is 2. Simply used this number as key value to avoid conflicts and use of scripts for keys like "Microsoft" and "Maps"
        streetsideOptions: { showExitButton: false, showCurrentAddress: false, overviewMapMode: 2 }
      }}
    />
  );
}