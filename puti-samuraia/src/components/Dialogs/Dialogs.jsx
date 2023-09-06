import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    // data receivers:
    let dialogs= props.data.dialogs;
    let messages = props.data.messages;


    // APPLYING MAPPING METHODS:
    let dialogsElements= dialogs.
        map( d => <DialogItem name={ d.name } id={ d.id } /> );
    let messageElements = messages
        .map( msg => <Message message={ msg.message } /> );

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>

            <div className={classes.messages}>
                { messageElements }
            </div>

        </div>
    );
}

export default Dialogs;