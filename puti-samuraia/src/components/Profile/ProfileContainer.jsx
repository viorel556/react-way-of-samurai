import React from "react";
import Profile from "./Profile";
import {getUser, getUserStatus, setUserProfile, updateMyStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {profileAPI, usersAPI} from "../../api/api";
import {compose} from "redux";

function withRouter(Component) {
    // MAKING THIS FUNC MANUALLY
    // because the previous withRouter() is deprecated. (now v6);
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();


        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}



class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;

        if (!userId) { // in case there is NO user ID, we will show our profile;
            userId = 30097; // my number: 30097
        }

        // CALLING 2 THUNKS (when the component mounts):
        this.props.getUser(userId);
        this.props.getUserStatus(userId)
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
        status: state.profilePage.status
    }
);

let mapDispatchToProps = (
    {
        getUser,
        getUserStatus,
        updateMyStatus
    }
)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),  // KONVEIER 3
    // 􀄨
    withRouter,                                             // KONVEIER 2
    // 􀄨
    // withAuthRedirect,                                       // KONVEIER 1
    // 􀄨
)(ProfileContainer);
