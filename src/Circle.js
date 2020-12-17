import React from 'react'; 

import {Circle as KonvaCircle} from 'react-konva'; 

export function Circle({type, id, ...shapeProps}) {
  return(
    <KonvaCircle {...shapeProps} /> 
  );
}