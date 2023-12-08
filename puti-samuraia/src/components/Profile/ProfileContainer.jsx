import React from "react";
import Profile from "./Profile";
import {getUser, getUserStatus, savePhoto, saveProfile, updateMyStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import withRouter from "../../hoc/withRouter";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId; // my number: 30097
        }

        // CALLING 2 THUNKS (when the component mounts):
        this.props.getUser(userId);
        this.props.getUserStatus(userId);
    }

    checkOwner() {
        // CHECKS IF THE DISPLAYED PROFILE MATCHES THE LOGIN PROFILE
        const authorizedUser = this.props.authorizedUserId;
        let displayedUser = this.props.router.params.userId;

        if (!displayedUser) { displayedUser = authorizedUser; }

        return authorizedUser === displayedUser; // returns true/false
        // (didn't find a better implementation for this)
    }

    isOwner = this.checkOwner();

    componentDidMount() {
        this.refreshProfile();
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // FIXME: Find a way to update the profile to my profile when clicking to "Profile";
    //     // we might need to convert it to a functional component;
    // }


    render() {


        return (

            <Profile {...this.props}
                     isOwner={this.isOwner}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateMyStatus={this.props.updateMyStatus}
                     savePhoto={this.props.savePhoto}
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
        updateMyStatus,
        savePhoto,
        saveProfile
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
