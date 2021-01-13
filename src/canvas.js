import React, { useCallback, useRef } from 'react'; 
import { Layer, Stage }  from "react-konva"; 

import { 
  useShapes, 
  createCircle, 
  createRectangle, 
  reset,
  saveDiagram, 
  clearSelection, 
} from "./state"; 
import { DRAG_DATA_KEY, SHAPE_TYPES} from './constants'; 
import { Shape } from './Shape';

const handleDragOver = (event) => event.preventDefault(); 

/* 
we have already set up shapes to be draggable in palette, so here we need allow
shapes to be dropped and added to the canvas component. 

To handle the drop of the shape, we have to attach an onDrop event listener
*/

export function Canvas() { 

  const shapes = useShapes((state) => Object.entries(state.shapes)); 
  const stageRef = useRef(); 

  /* 
  We handle the addition on shapes to the state in handleDrop handle function
  We access the type of the shape dragged by acesssing the DRAG_DATA_KEY payload
  value on the 'dataTransfer' attribute of the nativeEvent. 
  */

  const handleDrop = useCallback((event) => {
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY); 

    if (draggedData) { 
      const {offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(
        draggedData
      );
      
      /* setPointer, getPointer allows us to get the local coordinates of the 
      canvas component  */

      stageRef.current.setPointersPositions(event); 
      
      const coords = stageRef.current.getPointerPosition(); 

      /* 
      Based on the type dragged, we call the createRectangle or createCircle 
      state updater function, in state.js to update the global state. 

      here the true coordinates are calculate and is dependent on: 
      1. where the user clicked/dragged the shape in the palette component
      2. where the user dropped the shape in the canvas
      */
      if (type === SHAPE_TYPES.RECT) {
        // rectange x, y is at the top, left corner 
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        // circle x,y is at the centre of the circle
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      }
    }
  }, []);

  return ( 
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="buttons">
        <button onClick={reset}>Reset</button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth - 400 } 
        height={window.innerHeight}
        onClick={clearSelection}
      >
        <Layer>
          {shapes.map(([key, shape]) => (
            <Shape key={key} shape={{ ...shape, id: key}} />
          ))}
        </Layer>
      </Stage>
    </main>
  )
}