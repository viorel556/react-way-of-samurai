import {rerenderEntireTree} from "../render";

let state = {

    profilePage: {
        posts: [
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 2, message: "This is my first post  ", likesCount: 10}
        ],
        newPostText: "it-kamasutra.com"
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

window.state = state;

export let addPost = () => {

    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };

    state.profilePage.newPostText = '';
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);


}

export let updateNewPostText = (newText) => {

    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export default state;
