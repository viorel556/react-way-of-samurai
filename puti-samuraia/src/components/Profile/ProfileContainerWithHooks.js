
// FIXME: Trying to make this component functional (with hooks);
import Profile from "./Profile";
import React, {useState} from "react";

const ProfileContainerWithHooks = (props) => {

    let [userId, setUserId] = useState(props.router.params.userId);
    let [status, setUserStatus] = useState();

    if (!userId) {
        userId = props.authorizedUserId;
    }

    return (
        <Profile {...this.props}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateMyStatus={this.props.updateMyStatus}
        />
    );
}