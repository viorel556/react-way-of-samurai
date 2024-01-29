import React, {FC, useEffect, useState} from "react";
import {Avatar, Button} from "antd";
import s from "./Chat.module.css";
import {see} from "../../utils/object-helpers.ts";
import {ChatMessagePropsType, ChatMessageType} from "../../types/types.ts";
import {Field, Form, Formik} from "formik";
import {Textarea} from "../../components/common/FormsControls/FormsControls.tsx";

export const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

// ChatMessageType
const Chat: FC = () => {

    return <div>
        <h1>Chat</h1>
        <p>If the chat is not showing yet, please reload the page! </p>
        <Messages/>
        <AddMessage/>
    </div>
}


const Messages: FC = () => {

    // for now, we create a local state:
    const [messages, setMessages] =
        useState<ChatMessageType[]>([]);

    useEffect(() => {
        // ESTABLISHING WEBSOCKET CONNECTION:
        webSocketChannel.addEventListener('message', (e: MessageEvent) => {
            // see(JSON.parse(e.data));
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            // for those messages that exist we ADD new ones;
        })
    }, []);


    return (
        <div style={{height: '500px', overflowY: "auto"}}>
            { messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
}

const AddMessage: FC = () => {

    const [message, setMessage] = useState('');

    function sendMessage() {
        if (!message) { return } // we cancel this func if there is no message;
        webSocketChannel.send(message);
        setMessage(''); // nullify textarea after sending the message
    }


    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}>
                </textarea>
            </div>
            <div> <Button onClick={sendMessage}> Send </Button> </div>
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