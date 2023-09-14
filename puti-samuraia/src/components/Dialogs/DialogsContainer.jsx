import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    // let newMessageBody = state.newMessageBody;
    let onSendMessageClick = (message) => {
        props.store.dispatch(sendMessageCreator(message));
    }

    let updateNewMessageBody = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <Dialogs dialogsPage={ state }
                 onSendMessageClick={onSendMessageClick}
                 updateNewMessageBody={updateNewMessageBody}/>
    );
}

export default DialogsContainer;