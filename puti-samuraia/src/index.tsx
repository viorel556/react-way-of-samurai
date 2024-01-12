import './index.css';
import reportWebVitals from './reportWebVitals.ts';
import ReactDOM from "react-dom/client";
import React from "react";
import SamuraiJSApp from "./App";

// OLD CODE:
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*OUR APP IS UNDER BROWSER ROUTER CONTROL*/}
       <SamuraiJSApp/>

    </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// let onPerfEntry = console.log();
reportWebVitals(null);
