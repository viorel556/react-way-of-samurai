import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";


const ProfileInfo = ({profile, status, updateMyStatus}) => {


    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>


            <div className={classes.descriptionBlock}>

                <img src={profile.photos.large}/>

                <ProfileStatusWithHooks status={status}
                               updateMyStatus={updateMyStatus}
                />

                <p>{profile.fullName}</p>
                <p>{profile.aboutMe} </p>
                <p>GITHUB: {profile.contacts.github}</p>
            </div>


        </div>
    );
}

export default ProfileInfo;