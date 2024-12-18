/*import React from "react"
import Routes from "./Routes"
import ReactDOM from "react-dom"

ReactDOM.render(<Routes />, document.getElementById("root"));*/
//what you want to render, and where you want to render
import React from 'react';
import Routes from './Routes';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
