import React, {FC, useEffect, useRef, useState, UIEventHandler, memo} from "react";
import {Avatar, Button, Input} from "antd";
import s from "./Chat.module.css";
import {see} from "../../utils/object-helpers.ts";
import {AppDispatchType, ChatMessagePropsType, ChatMessageAPIType, WebSocketChannelType} from "../../types/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {ChatMessageType, sendMessage, startMessageListening, stopMessageListening} from "../../redux/chat-reducer.ts";
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

    const [name, setName] = useState('Michael');


    return <div className={s.chatContainer}>
        <h1>General Chat</h1>
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
    const [autoScroll, setAutoScroll] = useState(true);

    function scrollHandler(e: any) {
        let element = e.currentTarget;

        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            see('>>>> USER SCROLLED TILL THE END OF THE VIEW-SCREEN');
            setAutoScroll(true)
        }
        else {
            see('>>> USER IS SCROLLING');
            // setAutoScroll && setAutoScroll(false);
        }
    }

    useEffect(() => {
        // [!] IMPLEMENTING AUTO SCROLLING:
        if (autoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);

    return <div style={{height: '500px', overflowY: "auto"}}
                onScroll={scrollHandler}
            >
        {
            messages
                .map((m: ChatMessageType, index) =>
                    <Message key={m.id} message={m}/>)
        }
        <div ref={messagesAnchorRef}>

        </div>
    </div>
}

const Message: FC<ChatMessagePropsType> = memo( ({message}) => {
    return (
        <>
            <div className={s.nameAndImage}>
                <img src={message.photo} className={s.avatar}/>
                <b>{message.userName}</b>
            </div>

            <br/>
            <p className={s.message}>{message.message}</p>
            <hr/>
        </>
    )
});

const AddMessage: FC = () => {
    // LOCAL STATES: we use a local state to get the message from the prompt + handling BUTTON
    const [message, setMessage] = useState('');
    const dispatch: AppDispatchType = useDispatch();
    const status = useSelector(getWebSocketStatus);

    function handleKeyPress (event) {
        // Function to send a message just by pressing enter;
        if (event.key === 'Enter' && message.trim() !== '') {
            sendMessageHandler(); // Call the sendMessageHandler when Enter key is pressed and message is not empty
        }
    }

    function sendMessageHandler() {
        if (!message) { return } // no message ? do NOTHING;
        dispatch(sendMessage(message)) // dispatching a Thunk;
        setMessage('') // nullifying prompt
    }

    return (
        <div>
            <div className={s.inputAndSendArea}>
                <Input
                    className={s.input}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                    onPressEnter={handleKeyPress}
                >
                </Input>
                <Button size={"large"}
                    onClick={sendMessageHandler}>
                    Send
                </Button>
            </div>
        </div>
    );
}


export default Chat;