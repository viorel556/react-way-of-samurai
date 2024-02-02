import React, {FC, useEffect, useState} from "react";
import {Avatar, Button} from "antd";
import s from "./Chat.module.css";
import {see} from "../../utils/object-helpers.ts";
import {AppDispatchType, ChatMessagePropsType, ChatMessageType, WebSocketChannelType} from "../../types/types.ts";
import {Field, Form, Formik} from "formik";
import {Textarea} from "../../components/common/FormsControls/FormsControls.tsx";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessageListening, stopMessageListening} from "../../redux/chat-reducer.ts";
import {getMessages} from "../../redux/selectors/chat-selectors.ts";


// ChatMessageType
const Chat: FC = () => {
    const dispatch: AppDispatchType = useDispatch()

    useEffect(() => {
        dispatch(startMessageListening())
        return () => {
            dispatch(stopMessageListening()); // Clean up;
        }
    }, []);


    return <div>
        <h1>Chat</h1>
        <p>If the chat is not showing yet, please reload the page!</p>
        <Messages/>
        <AddMessage/>
    </div>
}

const Messages: FC = () => {
    const messages = useSelector(getMessages);

    return (
        <div style={{height: '500px', overflowY: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
}

const AddMessage: FC = () => {
    // LOCAL STATES: we use a local state to get the message from the prompt + handling BUTTON
    const [message, setMessage] = useState('');

    const dispatch: AppDispatchType = useDispatch();

    function sendMessageHandler(message) {
        // if (!message) { return } // if there is no message do NOTHING;
        dispatch(sendMessage(message)) // dispatching a Thunk;
        setMessage('') // nullifying prompt
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}>
                </textarea>
            </div>
            <div>
                <Button onClick={sendMessageHandler}>
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