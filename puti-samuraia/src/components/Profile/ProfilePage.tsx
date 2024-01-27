import React, {ComponentType, FC, useEffect} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {connect, useSelector} from "react-redux";
import {getAuthorizedUserId, getProfile, getStatus} from "../../redux/selectors/profile-salectors.ts";
import {getUser, getUserStatus, savePhoto, saveProfile, updateMyStatus} from "../../redux/profile-reducer.ts";
import {useAppDispatch} from "../../redux/redux-store.ts";
import {compose} from "redux";
import withRouter from "../../hoc/withRouter.tsx";
import withAuthRedirect from "../../hoc/withAuthRedirect.tsx";
import MyPosts from "./MyPosts/MyPosts.tsx";

type PropsType = {
    // profile: ProfileType
    // isOwner: boolean
    // status: string
    // saveProfile: (profile: ProfileType) => Promise<void>
    // updateMyStatus: (status: string) => void
    // savePhoto: (file: any) => void
    router?: any // FIXME: CORRECT TYPE
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
        <div>
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