import React from "react";
import Profile from "./Profile";
import {getUser, getUserStatus, savePhoto, saveProfile, updateMyStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import withRouter from "../../hoc/withRouter";
import {ProfileType} from "../../types/types.ts";
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUser: (userId: number) => void
    getUserStatus:  (userId: number) => void
    updateMyStatus:  (status: string) => void
    savePhoto: (file: any) => void
    saveProfile:  (profile: ProfileType) => Promise<void>
}

type OwnPropsType = {
    router?: any // [!] FIXME[EASY]: proper type has to be mentioned;
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

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


    componentDidUpdate(prevProps, prevState, snapshot) {
        // FIXME: Find a way to update the profile to my profile when clicking to "Profile";
        // if (this.props.match.params.userId != prevProps.match.params.userId) { this.refreshProfile() }
    }


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

let mapStateToProps = (state: AppStateType) => (
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

export default compose<React.Component>(
    connect(mapStateToProps, mapDispatchToProps),  // KONVEIER 3
    // 􀄨
    withRouter,                                    // KONVEIER 2
    // 􀄨
    withAuthRedirect,                              // KONVEIER 1
    // 􀄨
)(ProfileContainer);
