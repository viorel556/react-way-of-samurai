import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from '../../StoreContext';


const DialogsContainer = () => {
    // I AM A CONTAINER COMPONENT; 

    return ( 

        <StoreContext.Consumer> 
            {
                (store) => { 
                    let state = store.getState().dialogsPage;

                    let onSendMessageClick = (message) => {
                        store.dispatch(sendMessageCreator(message));
                    }

                    let updateNewMessageBody = (body) => {
                        store.dispatch(updateNewMessageBodyCreator(body))
                    }

                    return  <Dialogs dialogsPage={ state }
                     onSendMessageClick={onSendMessageClick}
                    updateNewMessageBody={updateNewMessageBody}/>
                }
            }
        </StoreContext.Consumer>   
    ); 
        
}

export default DialogsContainer;