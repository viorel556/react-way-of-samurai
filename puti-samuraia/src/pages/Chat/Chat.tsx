import React, {FC, useEffect, useState} from "react";
import {Avatar, Button} from "antd";
import s from "./Chat.module.css";
import {see} from "../../utils/object-helpers.ts";
import {ChatMessagePropsType, ChatMessageType, WebSocketChannelType} from "../../types/types.ts";
import {Field, Form, Formik} from "formik";
import {Textarea} from "../../components/common/FormsControls/FormsControls.tsx";


// ChatMessageType
const Chat: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket>(null);

    useEffect(() => {
        let ws: WebSocket;

        function closeHandler() {
            see('WS CHANNEL IS CLOSED!')
            see("CREATING A NEW CHANNEL... ")
            setTimeout(createChannel, 3000) // launches the function after 3s;
        }

        function createChannel() {
            // if a previous channel existed, we remove it
            ws?.removeEventListener('close', closeHandler); ws?.close();

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws?.addEventListener('close', closeHandler);
            setWsChannel(ws);
        }

        createChannel();

        return() => {
            ws?.removeEventListener('close', closeHandler);
            ws.close();
        }
    }, []);


    return <div>
        <h1>Chat</h1>
        <p>If the chat is not showing yet, please reload the page!</p>
        <Messages wsChannel={wsChannel}/>
        <AddMessage wsChannel={wsChannel}/>
    </div>
}

const Messages: FC<WebSocketChannelType> = ({wsChannel}) => {

    // for now, we create a local state:
    const [messages, setMessages] =
        useState<ChatMessageType[]>([]);

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            // for those messages that exist we ADD new ones;
        };

        wsChannel?.addEventListener('message', messageHandler);

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel]);

    return (
        <div style={{height: '500px', overflowY: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
}

const AddMessage: FC<WebSocketChannelType> = ({wsChannel}) => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] =
        useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        function openHandler() { setReadyStatus('ready') }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel]);

    function sendMessage() {
        wsChannel?.send(message);
        setMessage(''); // nullify textarea after sending the message
    }


    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}>
                </textarea>
            </div>
            <div>
                <Button disabled={readyStatus !== 'ready'}
                        onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
}

const Message: FC<ChatMessagePropsType> = ({message}) => {


    return (
        <>
            <img src={message.photo} className={s.avatar}/> <b>{message.userName}</b>
            <br/>
            <p>{message.message}</p>

            <hr/>
        </>
    );
}

export default Chat;