import React, {FC} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import AddMessageReduxForm from "./Message/AddMessageForm/AddMessageForm";
import {DialogType, MessageType} from "../../types/types.ts";
import {see} from "../../utils/object-helpers.ts";

// TS MIGRATION: I'm pretty confident this is properly migrated to TS;

type DialogsPropsType = {
    dialogsPage: {
        messages: MessageType[]
        dialogs: DialogType[]
    }
    dispatch: () => void
    isAuth: boolean
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: FC<DialogsPropsType> = (props) => {
    let state = props.dialogsPage;

    // Mapping data:
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messageElements = state.messages.map(msg => <Message message={msg.message} key={msg.id}/>);


    let addNewMessage = (values: {newMessageBody: string} ) => {
        props.sendMessage(values.newMessageBody);
        values.newMessageBody = '' // <- nullifying the textarea after sending a message;
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