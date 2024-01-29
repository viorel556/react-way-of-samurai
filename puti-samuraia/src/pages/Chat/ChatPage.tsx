import React, {ComponentType} from "react";
import {FC} from "react";
import withRouter from "../../hoc/withRouter.tsx";
import {compose} from "redux";
import {withSuspense} from "../../hoc/withSuspense.tsx";
import withAuthRedirect from "../../hoc/withAuthRedirect.tsx";
import Chat from "./Chat.tsx";

// establishing a WS channel:


const ChatPage: FC = () => {

    return (
       <div>
            <Chat />
       </div>
    );
}

export default compose<ComponentType>(
    // 􀄨
    withRouter,
    // 􀄨
    withSuspense,
    // 􀄨
    withAuthRedirect
)(ChatPage);