import React from "react";
import { render } from "react-dom";
import { Palette } from '../src/Palette';

const App = () => {

  return (
    <div>
      <Palette />
    </div>
  );
};

render(<App />, document.getElementById("root"));



export default App;
