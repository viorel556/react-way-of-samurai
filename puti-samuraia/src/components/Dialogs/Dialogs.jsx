import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Login from "../Login/Login";
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

export const AddMessageForm = (props) => { // THE FORM

    return (
        <form onSubmit={props.handleSubmit }>
            <div>

                <Field component="textarea"
                       name="newMessageBody"
                       placeholder="Enter your message"/>
            </div>
            <div>


                <button>Send</button>

            </div>
        </form>
    );
}
const AddMessageReduxForm = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm);

const Dialogs = (props) => {
    let state = props.dialogsPage;

    // Mapping data:
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messageElements = state.messages.map(msg => <Message message={msg.message} key={msg.id}/>);
    let newMessageBody = state.newMessageBody;

    // FOCUS:
    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messageElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>


        </div>
    );
}

export default Dialogs;