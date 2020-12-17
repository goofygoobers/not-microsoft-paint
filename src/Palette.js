import React from 'react'; 

import { DRAG_DATA_KEY, SHAPE_TYPES } from "./constants";

/* 
this handleDragStart handler, uses HTML5 Drag and Drop API to set the
dataTransfer value to pass on necessary data that will be used by the 
drop event listener on the CANVAS container element. 
The data we pass include: type, shape, offsetX, offsetY and the dimensions 
of the palette node.
We can only pass string values hence line 23 - stringify our payload object */

const handleDragStart = (event) => {
  const type = event.target.dataset.shape;

  if (type) { 
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight; 

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
  }
}

export function Palette() {
  return(
    <aside className="palette">
      <h2>Shapes</h2>
      {/* 
      - adding shapes via index.css
      - draggable attribute makes it draggable.
      - data-shape attribute on each div, allows us to be able to identify
        the right shape being dragged in the event handlers. 
      - The onDragStart event handler, executes a javascript (handleDragStart function) 
        when the user starts to drag the element. 
      */}
      <div 
        className="shape"
        data-shape={SHAPE_TYPES.RECT}
        draggable
        onDragStart={handleDragStart}
      />
      <div 
        className="shape circle"
        data-shape={SHAPE_TYPES.CIRCLE}
        draggable
        onDragStar={handleDragStart}
      />
      {/* <div 
        className="gg-shape-triangle"
        data-shape={SHAPE_TYPES.CIRCLE}
        draggable
        onDragStar={handleDragStart}
      /> */}
    </aside>
  )
}