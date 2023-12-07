import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";


const ProfileInfo = ({profile, status, updateMyStatus, isOwner, savePhoto}) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {

        if (e.target.files) {
            savePhoto(e.target.files[0]);
        }

    }

    return (

        <div>

            <div className={classes.descriptionBlock}>

                <img src={profile.photos.large || userPhoto} className={classes.profileImage}/>

                { isOwner && <input type={"file"} onChange={onMainPhotoSelected}/> }

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