import React from 'react';
import { ReactPainter } from 'react-painter';
import './App.css';





function App() {

  const Drawable = () => (
    <ReactPainter
      width={300}
      height={300}
      onSave={blob => console.log(blob)}
      render={({ triggerSave, canvas, setColor, setLineWidth, setLineJoin, setLineCap }) => (
        <div>
          <div>Awesome heading</div>
          <select onChange={e => setLineCap(e.target.value)}>
            <option value="round">round</option>
            <option value="butt">butt</option>
            <option value="square">square</option>
          </select>
          <select onChange={e => setLineJoin(e.target.value)}>
            <option value="round">round</option>
            <option value="bevel">bevel</option>
            <option value="miter">miter</option>
          </select>
          <input type="color" onChange={e => setColor(e.target.value)} />
          <input type="number" onChange={e => setLineWidth(e.target.value)} />
          <div className="awesomeContainer">{canvas}</div>
          <div>{canvas}</div>
          <button onClick={triggerSave}>Save Canvas</button>
          
        </div>
      )}
    />
  );

  return (
    Drawable()
  );
}

export default App;
