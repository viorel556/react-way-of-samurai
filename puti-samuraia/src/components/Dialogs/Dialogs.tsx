import React, {ComponentType, FC} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageReduxForm from "./Message/AddMessageForm/AddMessageForm";
import {actions} from "./../../redux/dialogs-reducer.ts"
import {connect, useSelector} from "react-redux";
import {getDialogsPage} from "../../redux/selectors/dialogs-selectors.ts";
import {getIsAuth} from "../../redux/selectors/other-selectors.ts";
import {useAppDispatch} from "../../redux/redux-store.ts";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect.tsx";


const Dialogs: FC = () => {
    const dispatch = useAppDispatch();

    // SELECTORS:
    const dialogsPage = useSelector(getDialogsPage);
    const dialogs = dialogsPage.dialogs;
    const messages = dialogsPage.messages;
    const isAuth = useSelector(getIsAuth);

    // CALLBACKS:
    const sendMessage = actions.sendMessage;

    // Mapping data:
    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messageElements = messages.map(msg => <Message message={msg.message} key={msg.id}/>);

    let addNewMessage = (values: {newMessageBody: string} ) => {
        dispatch(sendMessage(values.newMessageBody));
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

export default compose<ComponentType>(
    // 􀄨
    withAuthRedirect // KONVEIER 1
    // 􀄨
)(Dialogs);