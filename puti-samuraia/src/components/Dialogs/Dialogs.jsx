import React from 'react';
import classes from './Dialogs.module.css';
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {

    let path = '/dialogs/'+ props.id;

    return (
        <div className={`${classes.dialog} ${classes.active}`}>
            <NavLink to={ path }> {props.name} </NavLink>
        </div>
    );
}

const Message = (props) => {
    return <div className={classes.dialog}> { props.message } </div> ;
}

const Dialogs = (props) => {

    let dialogsData = [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrey" },
    ];

    let messagesData = [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How is IT-Kamasutra? " },
    ];

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                <DialogItem name={ dialogsData[0].name } id={ dialogsData[0].id } />
                <DialogItem name={ dialogsData[1].name } id={ dialogsData[1].id } />

            </div>

            <div className={classes.messages}>
                <Message message={ messagesData[0].message } />
                <Message message={ messagesData[1].message } />

            </div>

        </div>
    );
}

export default Dialogs;