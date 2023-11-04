import React from "react";
import Profile from "./Profile";
import {getUser, getUserStatus, updateMyStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import withRouter from "../../hoc/withRouter";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId; // my number: 30097
        }

        // CALLING 2 THUNKS (when the component mounts):
        this.props.getUser(userId);
        this.props.getUserStatus(userId);
    }

    render() {

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateMyStatus={this.props.updateMyStatus}
            />
        );
    }
}

let mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
);

let mapDispatchToProps = (
    {
        getUser,
        getUserStatus,
        updateMyStatus
    }
);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),  // KONVEIER 3
    // 􀄨
    withRouter,                                             // KONVEIER 2
    // 􀄨
    withAuthRedirect,                                       // KONVEIER 1
    // 􀄨
)(ProfileContainer);
