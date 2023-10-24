import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


// THIS SHIT IS NOT USED NOW:
let store = {
    // Data (state):
    _state: { // a PRIVATE state
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

            newMessageBody: "",

        },
        sidebar: {

        },
    },

    // METHODS:
    _callSubscriber () { // internal private method;
        console.log( "I don't do shit until my bro gives me a job");
    },

    getState() { return this._state; },

    subscribe  (observer) {
        // I don't do shit until somebody calls me
        // with a parameter (which I can pass to my bro)
        this._callSubscriber = observer;
    },

    dispatch( action ) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);

    }
}

window.state = store.getState();

export default store;