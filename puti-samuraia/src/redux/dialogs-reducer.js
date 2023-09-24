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

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            let stateCopy = {...state}

            stateCopy.newMessageBody = action.body;
            return stateCopy;
        }

        case SEND_MESSAGE: {
            let stateCopy = {...state}
            stateCopy.messages = [...state.messages]

            let body = stateCopy.newMessageBody;
            stateCopy.newMessageBody = '';
            stateCopy.messages.push(
                {id: 5, message: body}
            );
            return stateCopy;
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