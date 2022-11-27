import React, {useState} from 'react';
import BingMapsReact from "bingmaps-react";

//This component houses the Bing Map, which show the player a random place on earth in which they will have to guess where they are.
export default function QuestionMap (props) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  let Microsoft = window.Microsoft;
  console.log("Hello from MICROSOFT", Microsoft);

  return (
    <BingMapsReact
    onMapReady={() => {setIsMapLoaded(true)}}
    bingMapsKey="AvbDxkEoBBjb3rv1rfFWxUKJSLPGi8yLYCP9VC02-dgCUeDnDFg4-LCP4y16Nz-g&callback=loadMapScenario"
    height="100vh"
    mapOptions={{
      navigationBarMode: "square",
    }}
    width="100vh"
    viewOptions={{
      center: { latitude: 42.360081, longitude: -71.058884 },
      mapTypeId: "streetside",
      streetsideOptions: { showExitButton: false, showCurrentAddress: false  }
      // This line will be added to the above object - overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden
    }}
  />
  )
}