import React, {FC} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types.ts";
import {see} from "../../utils/object-helpers.ts";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    saveProfile: (profile: ProfileType) => Promise<void>
    updateMyStatus: (status: string) => void
    savePhoto: (file: any) => void
}

const Profile: FC<PropsType> = (props) => {

    if (props) see(props)

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         isOwner={props.isOwner}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateMyStatus={props.updateMyStatus}
                         savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;