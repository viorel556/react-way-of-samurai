import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {addPost} from "./redux/state";

export let rerenderEntireTree = (state) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>

            {/*OUR APP IS UNDER BROWSER ROUTER CONTROL*/}
            <BrowserRouter>
                <App state={state}
                     addPost={addPost}
                />
            </BrowserRouter>

        </React.StrictMode>
    );
}