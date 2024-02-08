import React, {ComponentType, FC, useEffect} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {connect, useSelector} from "react-redux";
import {
    getUser,
    getUserStatus,
    savePhoto,
    saveProfile,
    updateMyStatus
} from "../../redux/profile-reducer.ts";
import {useAppDispatch} from "../../redux/redux-store.ts";
import {compose} from "redux";
import withRouter from "../../hoc/withRouter.tsx";
import withAuthRedirect from "../../hoc/withAuthRedirect.tsx";
import MyPosts from "./MyPosts/MyPosts.tsx";
import {HistoryRouterProps, MemoryRouterProps, RouterProviderProps} from "react-router-dom";
import {ProfileType} from "../../types/types.ts";
import {getAuthorizedUserId, getProfile, getStatus} from "../../redux/selectors/selectors.ts";
import classes from './Profile.module.css';



type PropsType = {
    router?: any  // FIXME[HARD]: CORRECT TYPE; We might want to refactor this. There has to be a certain hook for this task;
}

const ProfilePage: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    function checkOwner (authorizedUserId: number, displayedUser: number){
        // CHECKS IF THE DISPLAYED PROFILE MATCHES THE LOGIN PROFILE
        if (!displayedUser) { displayedUser = authorizedUserId; }
        return authorizedUserId === displayedUser; // returns true/false
    }
    function refreshProfile() {
        let userId = props.router.params.userId;
        if (!userId) { userId = authorizedUserId } // my number: 30097
        // CALLING 2 THUNKS (when the component mounts):
        dispatch(getUser(userId));
        dispatch(getUserStatus(userId));
    }

    // SELECTORS
    const profile = useSelector(getProfile);
    const authorizedUserId = useSelector(getAuthorizedUserId);
    const status = useSelector(getStatus);
    const displayedUser = props.router.params.userId;
    const isOwner = checkOwner(authorizedUserId, displayedUser);

    useEffect( () => {
        refreshProfile()
    }, [])

    return (
        <div className={classes.container}>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         saveProfile={saveProfile}
                         updateMyStatus={updateMyStatus}
                         savePhoto={savePhoto}
            />
            <MyPosts />
        </div>
    );
}

export default compose<ComponentType>(
    // 􀄨
    withRouter,                                    // KONVEIER 2
    // 􀄨
    withAuthRedirect,                              // KONVEIER 1
    // 􀄨
)(ProfilePage);