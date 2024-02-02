import { InferActionsType} from "./redux-store.ts";
import {ChatMessageType} from "../types/types.ts";
import {ThunkType} from "./auth-reducer.ts";
import {chatAPI} from "../api/chat-api.ts";
import {Dispatch} from "redux";
import chat from "../pages/Chat/Chat.tsx";


// FIXME[MEDIUM]: CHECK WHY THE MESSAGE IS NOT SENT PROPERLY
// TYPES:
type InitialStateType = { messages: ChatMessageType[] }
type ActionTypes = InferActionsType<typeof actions>
type DispatchType = Dispatch<ActionTypes> // [!] THIS DISPATCH CAN WORK ALSO WITH DISPATCH (without explicitly specifying the actions);

// THE INITIAL STATE
let initialState: InitialStateType = {
    messages: [] as ChatMessageType[]
    // {!} "empty array as an array of ChatMessageType elements"
};

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => (
        { type: "MESSAGES_RECEIVED", payload: {messages} } as const
    )
}

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "MESSAGES_RECEIVED": {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        }
        default: return state;
    }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: DispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => { // WE, PRETTY MUCH, CREATE THE FUNCTION HERE (BS CODE)
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

export const startMessageListening = (): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessageListening = (): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;