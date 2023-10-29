import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Login from "../Login/Login";
import {Navigate} from "react-router-dom";


const Dialogs = (props) => {
    let state = props.dialogsPage;

    // Mapping data:
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messageElements = state.messages.map(msg => <Message message={msg.message} key={msg.id} />);


    let newMessageBody = state.newMessageBody;
    let onSendMessageClick = () => {
        props.sendMessage(newMessageBody);
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value; // we use target to avoid refs; target is <textarea>;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messageElements}</div>

                <div>
                    <div>

                        <textarea
                            value={newMessageBody}
                            placeholder="enter your message"
                            onChange={onNewMessageChange}
                        >

                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}> Send</button>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Dialogs;