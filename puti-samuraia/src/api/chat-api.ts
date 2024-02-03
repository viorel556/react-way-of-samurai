
import {ChatMessageType} from "../types/types.ts";
import {see} from "../utils/object-helpers.ts";
import {StatusType} from "../redux/chat-reducer.ts";

// TYPES:
type MessageReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
type EventType = 'messages-received' | 'status-changed';

const subscribers = {
    'messages-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket;

// HANDLERS:
function closeHandler() {
    see("WS CHANNEL CLOSED! CREATING A NEW CHANNEL... ");
    setTimeout(createChannel, 3000); // launches the function after 3s;
}

let messageHandler = (e: MessageEvent) => { // handles received messages: (1) Parses them;
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages));
    // {!} s - as argument si completely different from s-as function;
}

function cleanUp() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
}

function createChannel() {
    // if a previous channel existed, we remove it
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    // @ts-ignore
    subscribers["messages-received"]
        .forEach(s => s('pending')) // LAST POINT
    cleanUp();
}

export const chatAPI = {

    start() { createChannel() },
    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },

    subscribe(event: EventType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event].push(callback);
        return () => { // FIXME[EASY] this return statement seems redundant; CHECK;
            // @ts-ignore
            subscribers[event] = subscribers[event].filter(s => s !== callback);
        }
    },

    unsubscribe(event: EventType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback);
    },

    sendMessage(message: string) {
        ws.send(message);
    }
}