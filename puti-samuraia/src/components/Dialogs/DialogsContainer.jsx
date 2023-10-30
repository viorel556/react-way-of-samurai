import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import Dialogs from "./Dialogs";
import {compose} from "redux";



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


export default compose(
    connect(mapStateToProps, mapDispatchToProps), // KONVEIER 2
    // 􀄨
    withAuthRedirect, // KONVEIER 1
    // 􀄨
)(Dialogs);;