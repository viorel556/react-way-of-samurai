
import {ChatMessageAPIType} from "../types/types.ts";
import {see} from "../utils/object-helpers.ts";
import {StatusType} from "../redux/chat-reducer.ts";
import message from "../components/Dialogs/Message/Message.tsx";

// TYPES:
type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
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
    notifySubscribersAboutStatusChanged('pending');
    setTimeout(createChannel, 3000); // launches the function after 3s;
}
let messageHandler = (e: MessageEvent) => { // handles received messages: (1) Parses them;
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages));
    // {!} s - as argument si completely different from s-as function;
}
function openHandler() {
    notifySubscribersAboutStatusChanged('ready');
}

function errorHandler() {
    notifySubscribersAboutStatusChanged('error');
    see('ERROR HAPPENED, REFRESHING PAGE...')
}

function cleanUp() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatusChanged = (status: StatusType) => {
    subscribers["status-changed"]
        .forEach(s => s(status)) // LAST POINT
}

function createChannel() {
    // if a previous channel existed, we remove it
    cleanUp()
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatusChanged('pending');
    // cleanUp();
    ws?.addEventListener('close', closeHandler);
    ws?.addEventListener('message', messageHandler);
    ws?.addEventListener('open', openHandler);
    ws?.addEventListener('error', errorHandler);
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