import classes from "../Dialogs.module.css";
import React, {FC} from "react";

type MessagePropsType = {
    message: string
}
const Message: FC<MessagePropsType> =  (props) => {
    return <div className={classes.dialog}> { props.message } </div>;
}

export default Message;