import React, {FC, useEffect, useRef, useState, UIEventHandler} from "react";
import {Avatar, Button} from "antd";
import s from "./Chat.module.css";
import {see} from "../../utils/object-helpers.ts";
import {AppDispatchType, ChatMessagePropsType, ChatMessageType, WebSocketChannelType} from "../../types/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessageListening, stopMessageListening} from "../../redux/chat-reducer.ts";
import {getMessages, getStatus, getWebSocketStatus} from "../../redux/selectors/selectors.ts";


// ChatMessageType
const Chat: FC = () => {
    const dispatch: AppDispatchType = useDispatch();
    const status = useSelector(getStatus);

    useEffect(() => {
        dispatch(startMessageListening())
        return () => {
            dispatch(stopMessageListening()); // Clean up;
        }
    }, []);


    return <div>
        <h1>Chat</h1>
        <p>If the chat is not showing yet, please reload the page!</p>
        {status === 'error'
            ? <div>Some error occured, Please refresh the page;</div>
            : <>
                <Messages/>
                <AddMessage/>
            </>
        }
    </div>
}

const Messages: FC = () => {
    // SELECTORS:
    const messages = useSelector(getMessages);
    // CREATING A REF (to implement auto-scrolling):
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    // CREATING A LOCAL STATE FOR AUTO-SCROLL
    const [autoScroll, setAutoScroll] = useState(false);

    function scrollHandler(e: any) {
        let element = e.currentTarget;

        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            see('>>>> USER SCROLLED TILL THE END OF THE VIEW-SCREEN');
            !setAutoScroll && setAutoScroll(true);
            // FIXME[EASY]: We might probably need to make something just simple as setAutoScroll(true)
        }
        else {
            see('>>> USER IS SCROLLING');
            setAutoScroll && setAutoScroll(false);
            // FIXME[EASY]: We might probably need to make something just simple as setAutoScroll(true)
        }
    }

    useEffect(() => {
        // [!] IMPLEMENTING AUTO SCROLLING:
        if (autoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);

    return <div style={{height: '500px', overflowY: "auto"}} onScroll={scrollHandler}>
        {
            messages
                .map((m, index) =>
                    <Message key={index} message={m}/>)
        }
        <div ref={messagesAnchorRef}>

        </div>
    </div>
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

const AddMessage: FC = () => {
    // LOCAL STATES: we use a local state to get the message from the prompt + handling BUTTON
    const [message, setMessage] = useState('');
    const dispatch: AppDispatchType = useDispatch();
    const status = useSelector(getWebSocketStatus);

    function sendMessageHandler() {
        if (!message) { return } // no message ? do NOTHING;
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
                <Button
                    // disabled={status !== 'ready'} // disable button if the status IS NOT 'ready'
                    onClick={sendMessageHandler}>
                    Send
                </Button>
            </div>
        </div>
    );
}


export default Chat;