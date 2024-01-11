import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App.ts";
import profileReducer, {addPostActionCreator, deletePostAction} from "./profile-reducer";

let state =
    {
        posts: [
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 2, message: "This is my first post  ", likesCount: 10}
        ]
    }

it('array length is INCREMENTED with +1', () => {

    // 1. test data:
    let action =
        addPostActionCreator('it-kamasutra.com');

    // 2. action
    let newState = profileReducer(state, action );

    // 3. expected return:
    expect(newState.posts.length).toBe(4); // testing if the array has increased with +1;
});

it('new element added MATCHES input', () => {

    // 1. test data:
    let action =
        addPostActionCreator('it-kamasutra.com');

    // 2. action
    let newState = profileReducer(state, action );

    // 3. expected return:
    expect(newState.posts[3].message).toBe('it-kamasutra.com'); // testing if the 4th element is exactly what we gave;
});

it('after deletion, length of array should be decremented', () => {

    // 1. test data:
    let action =
        deletePostAction(1);

    // 2. action
    let newState = profileReducer(state, action );

    // 3. expected return:
    expect(newState.posts.length).toBe(2); // testing if the array has increased with +1;
});
