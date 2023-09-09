import {rerenderEntireTree} from "../render";

let state = {

    profilePage: {
        posts: [
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 2, message: "This is my first post  ", likesCount: 10}
        ],

    },

    dialogsPage: {
        messages: [
            {id: 1, message: "Hello!"},
            {id: 2, message: "How is IT-Kamasutra? "},
            {id: 3, message: "YO"},
            {id: 4, message: "YO!"}
        ],
        dialogs: [
            {id: 1, name: "Dimych"},
            {id: 2, name: "Andrey"}
        ],
    },

    sidebar: { }

}

export let addPost = (postMessage) => {

    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };

    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);

}

export default state;
