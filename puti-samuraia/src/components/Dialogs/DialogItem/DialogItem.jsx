import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

const DialogItem = (props) => {
    let path = '/dialogs/'+ props.id;

    return (
        <div className={`${classes.dialog} ${classes.active}`}>
            <NavLink to={ path }> {props.name} </NavLink>
        </div>
    );
}

export default DialogItem;