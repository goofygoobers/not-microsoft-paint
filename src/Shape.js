import React , { useCallback } from 'react'; 

import { SHAPE_TYPES} from './constants'; 
import { useShapes } from './state'; 
import { Circle } from './Circle'; 
import { Rectangle } from './Rectangle'; 

export function Shape({ shape }) {
  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} />; 
  } else if (shape.type === SHAPE_TYPES.CIRCLE) { 
    return <Circle {...shape} />; 
  }

  return null; 
}