const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {


    let stateCopy;

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return { // THIS IS A STATE COPY;
                ...state,
                newMessageBody: action.body
            }
        }

        case SEND_MESSAGE: {
            let body = state.newMessageBody;
            return  { // THIS IS A STATE COPY;
                ...state,
                newMessageBody: "",
                messages: [...state.messages, { id: 5, message: body } ]
            }
        }

        default:
            return state;
    }
}

export const sendMessageCreator = (body) => (
    {type: SEND_MESSAGE, body: body}
);
export const updateNewMessageBodyCreator = (body) => (
    {type: UPDATE_NEW_MESSAGE_BODY, body: body}
);

export default dialogsReducer;