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

    // DATA:
    let dialogs = [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrey" }
    ];
    let messages = [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How is IT-Kamasutra? " },
        { id: 3, message: "YO" },
        { id: 4, message: "YO!" },
        { id: 5, message: "YO bro!" },

    ];

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