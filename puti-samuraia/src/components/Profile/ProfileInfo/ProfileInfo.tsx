import React, {ChangeEvent, FC, useState} from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import {ProfileDataReduxForm} from "./ProfileDataForm.tsx";
import {ProfileType} from "../../../types/types.ts";
import {Button} from "antd";

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateMyStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: any
      // FIXME[HARD]: CORRECT TYPE; saveProfile is not any
     // its important that we use the Thunk here as Promise but we might want to refactor this shit anyway;
    // its simply bad UX to change your profile data by submitting a multiple line form;
}

const ProfileInfo: FC<PropsType> = ({profile,
                                        status,
                                        updateMyStatus,
                                        isOwner,
                                        savePhoto,
                                        saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) { return <Preloader/> }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) { savePhoto(e.target.files[0]); }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => setEditMode(false));
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div className={classes.imageSection}>
                    <img src={profile.photos.large || userPhoto} className={classes.profileImage}/>
                    <ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>

                    <div>
                        { isOwner
                            &&
                            <div>
                                <input type="file" id="fileInput" className={classes.editImgInput} onChange={onMainPhotoSelected}/>
                                <label htmlFor="fileInput" className={classes.editImgBtn}>Upload Image</label>
                            </div>
                        }
                    </div>
                </div>

                <div>
                    {editMode
                        ? <ProfileDataReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile}/>
                        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
                </div>
            </div>
        </div>
    );
}

export const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={classes.profileDetailsSection}>

            <h1>{profile.fullName}</h1>

            <div>
                <b>About me: </b> {profile.aboutMe || "..."}
            </div>

            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
            </div>

            <div>
                <b>My professional skills: </b> {profile.lookingForAJob ? profile.lookingForAJobDescription : ""}
            </div>

            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key  => {
                return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>

            {isOwner && <div>
                <button className={classes.editBtn} onClick={goToEditMode}>Edit Profile</button>
            </div>}
        </div>
    )
}


export const Contact = ({contactTitle, contactValue}) => {
    // MINI-COMPONENT
    return <div className={classes.contactStyle}><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;