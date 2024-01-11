import React, {ComponentType} from 'react';
import classes from './Dialogs.module.css';
import {actions} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import Dialogs from "./Dialogs";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store.ts";
import {DialogType, MessageType} from "../../types/types.ts";

// FIXME: UNFINISHED MIGRATION TO TS: any on line 29

type DialogsPageType = {
    messages: MessageType[]
    dialogs: DialogType[]
}
type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    // here we can write that we expect a thunk type (after set-up in dialogs reducer)
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actions.sendMessage(newMessageBody));
        }
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps), // KONVEIER 2
    // 􀄨
    withAuthRedirect, // KONVEIER 1
    // 􀄨
)(Dialogs);