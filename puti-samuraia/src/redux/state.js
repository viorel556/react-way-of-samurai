
let store = {
    _state: { // a PRIVATE store
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
        sidebar: { },
    },

    // METHODS:
    getState() { return this._state; },

    _callSubscriber () { // internal private method;
        console.log( "I don't do shit until my bro gives me a job");
    },

    addPost() {


        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };

        this._state.profilePage.newPostText = '';
        this._state.profilePage.posts.push(newPost);
        this._callSubscriber(this._state);

    },

    updateNewPostText (newText) {

        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state); // <- re-rendering;

    },

    subscribe  (observer) {
        // I don't do shit until somebody calls me
        // with a parameter (which I can pass to my bro)
        this._callSubscriber = observer;
    },
}

window.state = store.getState();

export default store;