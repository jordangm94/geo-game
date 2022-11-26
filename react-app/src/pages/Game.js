import React, {useState, useRef} from 'react';
import BingMapsReact from "bingmaps-react";

import LeafletMap from '../components/LeafletMap';

export default function Game() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  return (
    <>
    <LeafletMap />
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
    </>
  );
}