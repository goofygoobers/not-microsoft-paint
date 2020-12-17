import React from "react";

import { Palette } from '../src/Palette';
import { Canvas } from '../src/canvas';
import { PropertiesPanel } from '../src/PropertiesPanel';

const App = () => {

  return (
    <div>
      <Palette />
      <Canvas />
      <PropertiesPanel /> 
    </div>
  );
};

export default App;
