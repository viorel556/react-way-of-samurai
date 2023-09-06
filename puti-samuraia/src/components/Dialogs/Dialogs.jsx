import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    // Mapping data:
    let dialogsElements = props.dialogs
        .map( d => <DialogItem name={ d.name } id={ d.id } /> );
    let messageElements = props.messages
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