import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React, {FC} from "react";

type DialogsItemPropsType = {
    id: number
    name: string
}

const DialogItem: FC<DialogsItemPropsType> = (props) => {
    let path = '/dialogs/'+ props.id;

    return (
        <div className={`${classes.dialog} ${classes.active}`}>
            <NavLink to={ path }> {props.name} </NavLink>
        </div>
    );
}

export default DialogItem;