//Used to create a global state store.
import { createStore } from "@halka/state"; 
import produce from "immer"; 
import clamp from "clamp";
//nanoid to generate unique keys for each shape
import { nanoid } from "nanoid"; 

import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants"; 

const APP_NAMESPACE = "__integrtr_diagrams__";

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
export const useShapes = createStore(() => {
  const initialState = JSON.parse(localStorage.getItem(APP_NAMESPACE));

  return { ...baseState, shapes: initialState ?? {} };
});
const setState = (fn) => useShapes.set(produce(fn));

export const saveDiagram = () => {
  const state = useShapes.get();

  localStorage.setItem(APP_NAMESPACE, JSON.stringify(state.shapes));
};

export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);

  useShapes.set(baseState);
};
/* 
this function createRectangle will add a rectangle shape to the state when passed an 
x and y coordinate. 

nanoid is used to generate an unique id for each shape and save
- x,y values passed 
- along with default values such as: width, height, fill and stroke. 

*/

export const createRectangle = ({ x , y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
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

/* same function here but for the circle shape  */

export const createCircle = ({ x,y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.CIRCLE,
      radius: DEFAULTS.CIRCLE.RADIUS,
      fill: DEFAULTS.CIRCLE.FILL, 
      stroke: DEFAULTS.CIRCLE.STROKE, 
      x,
      y,
    };
  });
};


/* 
state updater functions from selecting and moving shapes

for the selectShape handler, we just set the id of the 
shape as the "selected property" in our state

the clearSelection handler, sets the 'selected property' in our state
to null

the moveShape handler, we first check if a shape is selected then update x 
and y coords values of the shape. 
*/

export const selectShape = (id) => {
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (id, event) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  });
};


export const updateAttribute = (attr, value) => {
  setState((state) => {
    const shape = state.shapes[state.selected];

    if (shape) {
      shape[attr] = value;
    }
  });
};

/* 

state updater function for resizing and rotating shapes. 
Utilising Konva.Transformer for handling these transformations in the canvas. 
By default, it manipulates the scale of the shape it transforms but we need to 
increase width and height so that other properties like stroke width are not 
affected. 

*/

export const transformRectangleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();
      
      shape.rotation = node.rotation();
      
       shape.width = clamp(
        // increase the width in order of the scale
        node.width() * scaleX,
        // should not be less than the minimum width
        LIMITS.RECT.MIN,
        // should not be more than the maximum width
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
};

export const transformCircleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.radius = clamp(
        (node.width() * scaleX) / 2,
        LIMITS.CIRCLE.MIN,
        LIMITS.CIRCLE.MAX
      );
    }
  });
};