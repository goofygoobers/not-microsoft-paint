//Used to create a global state store.
import { createStore } from "@halka/state"; 
import produce from "immer"; 
//nanoid to generate unique keys for each shape
import { nanoid } from "nanoid"; 

import { SHAPE_TYPES, DEFAULTS } from "./constants"; 

const baseState = {
  selected: null, 
  shapes: {}, 
};
/* 
createStore returns a react hook named 'useShapes' that can be 
used inside any React Function component to subscribe to the state. 

useShapes hook also comes with a set method on it which is an state updater 
function which is similar to setState function 

*/
export const useShapes = createStore(baseState);
const setState = (fn) => useShapes.set(produce(fn)); 

/* 
this function createRectangle will add a rectangle shape to the state when passed an 
x and y coordinate. 

nanoid is used to generate an unique id for each shape and save
- x,y values passed 
- along with default values such as: width, height, fill and stroke. 

*/

export const createRectangle = ({ x,y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      types: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT, 
      fill: DEFAULTS.RECT.FILL, 
      stroke: DEFAULTS.RECT.STROKE,
      rotation: DEFAULTS.RECT.ROTATION,
      x,
      y,
    };
  });
};

/* same fucntion here but for the circle shape  */

export const createCircle = ({ x,y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      types: SHAPE_TYPES.CIRCLE,
      radius: DEFAULTS.CIRCLE.RADIUS,
      fill: DEFAULTS.CIRCLE.FILL, 
      stroke: DEFAULTS.CIRCLE.STROKE, 
      x,
      y,
    };
  });
};
