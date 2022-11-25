import './App.css';
import BingMapsReact from "bingmaps-react";
import { useState } from 'react';

function App() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div>
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
    </div>
  );
}

export default App;
