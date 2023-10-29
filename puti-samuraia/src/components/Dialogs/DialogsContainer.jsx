import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import Dialogs from "./Dialogs";



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: (message) => {
            dispatch(sendMessageCreator(message));
        }
    }
}

// CREATING A CONTAINER WITH A HOC:
let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer =
    connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
// CREATES a container component;
// RENDERS Dialogs component;
// PASSES props from two objects f1, mapDispatchToProps;


export default DialogsContainer;