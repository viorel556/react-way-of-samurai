
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
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return  { // THIS IS A STATE COPY;
                ...state,
                messages: [...state.messages, { id: 5, message: body } ]
            }
        }

        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => (
    {type: SEND_MESSAGE, newMessageBody}
);


export default dialogsReducer;