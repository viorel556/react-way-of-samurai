import React, {useState} from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import jobChecker from "../../../assets/images/jobCheck.png"
import {ProfileDataReduxForm} from "./ProfileDataForm.jsx";
import {ProfileType} from "../../../types/types.ts";


// FIXME [HARD]: ALL OF THIS REQUIRES URGENT REFACTORING;

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateMyStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateMyStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        // WE CERTAINLY RECEIVE FORM DATA!
        saveProfile(formData).then(() => setEditMode(false));
    }

    return (

        <div>

            <div className={classes.descriptionBlock}>

                <img src={profile.photos.large || userPhoto} className={classes.profileImage}/>

                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}


                <ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>

                <p>{profile.fullName}</p>
                <p>{profile.aboutMe} </p>
                <p>GITHUB: {profile.contacts.github}</p>

            </div>

        </div>
    );
}

export const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}

            <div>
                <b>Full name: </b> {profile.fullName}
            </div>

            <div>
                {/*<img className={classes.jobChecker} src={jobChecker}/>*/}
                <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
            </div>

            <div>
                <b>My professional skills: </b> {profile.lookingForAJob ? profile.lookingForAJobDescription : ""}
            </div>

            <div>
                <b>About me: </b> {profile.aboutMe || "..."}
            </div>

            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}


export const Contact = ({contactTitle, contactValue}) => {
    // MINI-COMPONENT
    return <div className={classes.contactStyle}><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;