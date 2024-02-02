import {ChatMessageType} from "../types/types.ts";
import {see} from "../utils/object-helpers.ts";
type SubscriberType = (messages: ChatMessageType[]) => void;


let subscribers = [] as SubscriberType[];
let ws: WebSocket;


// HANDLERS:
function closeHandler() {
    see("WS CHANNEL IS CLOSED! CREATING A NEW CHANNEL... ");
    setTimeout(createChannel, 3000) // launches the function after 3s;
}
let messageHandler = (e: MessageEvent) => {
    // handles received messages: (1) Parses them;

    try {
        const newMessages = JSON.parse(e.data);
        subscribers.forEach(s => s(newMessages)); // {!} s - as argument si completely different than s-as function; its just shitty code really;
    }
    catch (e) { see(e) }

}

function createChannel() {
    // if a previous channel existed, we remove it
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

export const chatAPI = {

    start() { createChannel() },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },

    subscribe (callback: SubscriberType) {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(s =>  s !== callback)
        }
    },

    unsubscribe (callback: SubscriberType) {
        subscribers = subscribers.filter(s =>  s !== callback)
    },

    sendMessage (message: string) {
        ws.send(message);
    }
}