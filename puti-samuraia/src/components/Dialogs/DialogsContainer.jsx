import React from 'react';
import classes from './Dialogs.module.css';
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
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

        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps), // KONVEIER 2
    // 􀄨
    withAuthRedirect, // KONVEIER 1
    // 􀄨
)(Dialogs);