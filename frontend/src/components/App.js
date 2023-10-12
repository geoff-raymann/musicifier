import React, { Component } from 'react';
import { react, render } from 'react-dom';


function App() {
      return <h1>Testing React code</h1>;
    }

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.ender(<App />);

export default App;


