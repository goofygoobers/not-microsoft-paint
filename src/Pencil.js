import React, { useEffect } from 'react'; 
import { ReactComponent as Brush } from '../src/images/pencil.svg'; 

function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  
  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle]
}

function Paintbrush(){

  const [isSelected, toggleIsSelected] = useToggle();

  const [tool, setTool] = React.useState("");

  const selectTool = () => {
    if (tool === ""){
      setTool("pen")
    }
    else if ( tool === "pen"){
      setTool("")
    }
  }

  // const [tool, setTool] = React.useState('pen');
  // const [lines, setLines] = React.useState([]);
  // const isDrawing = React.useRef(false); 

  // const handleMouseDown = (e) => {
  //   isDrawing.current = true;
  //   const pos = e.target.getStage().getPointerPosition();
  //   setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  // };

  // const handleMouseMove = (e) => {
  //   // no drawing - skipping
  //   if (!isDrawing.current) {
  //     return;
  //   }
  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   let lastLine = lines[lines.length - 1];
  //   // add point
  //   lastLine.points = lastLine.points.concat([point.x, point.y]);

  //   // replace last
  //   lines.splice(lines.length - 1, 1, lastLine);
  //   setLines(lines.concat());
  // };

  // const handleMouseUp = () => {
  //   isDrawing.current = false;
  // };


  return(
    <div onClickCapture={() => toggleIsSelected}>
      <button 
      onClick={(e) => selectTool("pen")}> 
    <Brush height='100px' width='100px'/> 
    </button>
    <h1> {tool ? "tool selected: "+ tool : "brush unselected"} </h1>
    </div>
    )
}

export default Paintbrush; 