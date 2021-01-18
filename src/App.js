import React from "react";

import { Palette } from "./Palette";
import { Canvas } from "./canvas";
import { PropertiesPanel } from "./PropertiesPanel";

/* 
Palette component is where the library of shapes the user can chose from
Canvas is where the shapes can be dragged on
PropertiesPanel will have the options where users can change what the shapes look like 
*/

function App() {

  return (
    <div className="app">
      <Palette />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}

export default App;


