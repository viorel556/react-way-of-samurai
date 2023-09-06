import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//DATA:
let posts = [
    { id: 1, message: "Hey how are you!?!", likesCount: 20 },
    { id: 2, message: "This is my first post  ", likesCount: 10 }
];
let dialogs = [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" }
];
let messages = [
    { id: 1, message: "Hello!" },
    { id: 2, message: "How is IT-Kamasutra? " },
    { id: 3, message: "YO" },
    { id: 4, message: "YO!" }
];

let dialogs_data = { dialogs ,messages};

let data =  { posts, dialogs_data};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default data;
