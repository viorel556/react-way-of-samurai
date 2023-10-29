import React from "react";
import Profile from "./Profile";
import {getUser, setUserProfile} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { profileAPI, usersAPI} from "../../api/api";

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
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;

        if (!userId) { // in case there is NO user ID, we will show our profile;
            userId = 2;
        }

        // CALLING A THUNK:
        this.props.getUser(userId);
    }

    render () {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        );
    }
}

let mapStateToProps = (state) => (
    {
       profile: state.profilePage.profile
    }
);

let  withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps,
    {
        getUser,
    }

)(withUrlDataContainerComponent);