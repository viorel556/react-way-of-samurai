const SEND_MESSAGE = "SEND-MESSAGE";

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
type MessageType = { id: number, message: string }
type DialogsType = { id: number, name: string }
type InitialStateType = {
    messages: MessageType[]
    dialogs: DialogsType[]
}

let initialState: InitialStateType = {
    messages: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "How is IT-Kamasutra? "},
        {id: 3, message: "YO"},
        {id: 4, message: "YO!"}
    ],
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "David"}
    ]
};

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return { // THIS IS A STATE COPY;
                ...state,
                messages: [...state.messages, {id: 5, message: body}]
            }
        }

        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => (
    {type: SEND_MESSAGE, newMessageBody}
);


export default dialogsReducer;