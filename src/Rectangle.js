import React from 'react'; 

import { Rect as KonvaRectangle } from "react-konva"; 

export function Rectangle ({ type, id, ...shapeProps}) {
  return(
    <KonvaRectangle {...shapeProps} /> 
  );
}