import React from "react";

import { Palette } from "./Palette";
import { Canvas } from "./canvas";
// import { PropertiesPanel } from "./PropertiesPanel";

import { render } from 'react-dom';
import { Stage, Layer, Line, Text } from 'react-konva';

/* 
Palette component is where the library of shapes the user can chose from
Canvas is where the shapes can be dragged on
PropertiesPanel will have the options where users can change what the shapes look like 
*/

function App() {

  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  return (
    <div className="app">
      <Palette />
      <Canvas />
      {/* <PropertiesPanel /> */}
    </div>
  );
}

export default App;


