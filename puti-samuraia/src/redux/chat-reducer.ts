import { InferActionsType} from "./redux-store.ts";
import {ChatMessageAPIType} from "../types/types.ts";
import {ThunkType} from "./auth-reducer.ts";
import {chatAPI} from "../api/chat-api.ts";
import {Dispatch} from "redux";
import {v1} from 'uuid';


// FIXME[MEDIUM]: CHECK WHY THE MESSAGE IS NOT SENT PROPERLY
// TYPES:
type InitialStateType = {
    messages: ChatMessageAPIType[]
    status: string
}
type ActionTypes = InferActionsType<typeof actions>
type DispatchType = Dispatch<ActionTypes> // [!] THIS DISPATCH CAN WORK ALSO WITH DISPATCH (without explicitly specifying the actions);
export type StatusType = 'pending' | 'ready' | 'error';
export type ChatMessageType = ChatMessageAPIType & {id: string} // id probably is number

// THE INITIAL STATE
let initialState: InitialStateType = {
    messages: [] as ChatMessageType[],
    // {!} "empty array as an array of ChatMessageType elements"
    status: 'pending' as StatusType
}

export const actions = {

    messagesReceived: (messages: ChatMessageAPIType[]) => (
        { type: "MESSAGES_RECEIVED", payload: {messages} } as const
    ),

    statusChanged: (status: StatusType) => (
        { type: "STATUS_CHANGED", payload: {status} } as const
    )
}

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "MESSAGES_RECEIVED": {
            return {
                ...state,
                 // FIXME[HARD]: old code here; Only for optimization. It seems like TS doesn't see messages as array
                // not high priority - fix it if you have too much time at disposal
                // messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                //     .filter((m, index, array) => index >= array.length - 100)

                messages: [...state.messages, ...action.payload.messages]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        }
        case "STATUS_CHANGED": {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state;
    }
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
 // ?

const newMessageHandlerCreator = (dispatch: DispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => { // WE, PRETTY MUCH, CREATE THE FUNCTION HERE (BS CODE)
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

const statusChangedHandlerCreator = (dispatch: DispatchType) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status));
        }
    }
    return _newMessageHandler;
}

export const startMessageListening = (): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}
export const stopMessageListening = (): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
}

export const sendMessage = (message: string): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;