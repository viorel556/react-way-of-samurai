import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";


const ProfileInfo = (props) => {


    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img src='https://www.americanoceans.org/wp-content/uploads/2021/04/number-of-oceans.jpg'/>*/}
            {/*</div>*/}

            <div className={classes.descriptionBlock}>

                <img src={props.profile.photos.large}/>

                <ProfileStatus status={props.status}
                               updateMyStatus={props.updateMyStatus}
                />

                <p>{props.profile.fullName}</p>
                <p>{props.profile.aboutMe} </p>
                <p>GITHUB: {props.profile.contacts.github}</p>
            </div>


        </div>
    );
}

export default ProfileInfo;