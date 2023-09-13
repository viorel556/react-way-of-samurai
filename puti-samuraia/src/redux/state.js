const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let store = {
    // Data (state):
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

            newMessageBody: "",

        },
        sidebar: { },
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

    dispatch( action ) { // action - is an object { type: 'ADD-POST' }
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.newPostText = '';
            this._state.profilePage.posts.push(newPost);
            this._callSubscriber(this._state);
        }
        else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state); // <- re-rendering;
        }
        else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state); // <- re-rendering;
        }
        else if (action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messages.push(
                { id: 5, message: body }
            );

            this._callSubscriber(this._state); // <- re-rendering;
        }
    }
}


// HERE ARE THE ACTION CREATORS:
export const addPostActionCreator = () => (
    { type: ADD_POST }
);
export const updateNewPostTextActionCreator = (text) => (
    { type: UPDATE_NEW_POST_TEXT, newText: text }
);

export const sendMessageCreator = (body) => (
    { type: SEND_MESSAGE, body: body }
);

export const updateNewMessageBodyCreator = (body) => (
    { type: UPDATE_NEW_MESSAGE_BODY, body: body}
);



window.state = store.getState();

export default store;