import React from "react";

import { Palette } from '../src/Palette';
import { Canvas } from '../src/canvas';
import { PropertiesPanel } from '../src/PropertiesPanel';

const App = () => {

/* 
Palette component is where the library of shapes the user can chose from
Canvas is where the shapes can be dragged on
PropertiesPanel will have the options where users can change what the shapes look like 
*/
  return (
    <div>
      <Palette />
      <Canvas />
      <PropertiesPanel /> 
    </div>
  );
};

export default App;
