import React, {useState} from 'react';
import BingMapsReact from "bingmaps-react";

//This component houses the Bing map, which shows the player a random place on earth in which they will have to guess where they are.
export default function BingMap () {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div class="BingMap" >
    <BingMapsReact
    onMapReady={() => {setIsMapLoaded(true)}}
    bingMapsKey="AvbDxkEoBBjb3rv1rfFWxUKJSLPGi8yLYCP9VC02-dgCUeDnDFg4-LCP4y16Nz-g"
    height="100vh"
    mapOptions={{
      navigationBarMode: "square",
    }}
    width="100vh"
    viewOptions={{
      center: { latitude: 42.360081, longitude: -71.058884 },
      mapTypeId: "streetside",
      streetsideOptions: { showExitButton: false, showCurrentAddress: false }
    }}
  />
  </div>
  )
}