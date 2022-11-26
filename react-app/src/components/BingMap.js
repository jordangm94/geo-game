import React, {useState} from 'react';
import BingMapsReact from "bingmaps-react";

//This component houses the BingMap map, which show the player a random place on earth in which they will have to guess where they are

export default function BingMap () {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
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
  )
}