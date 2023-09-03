import React from "react";
import classes from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div cla>
            <div>
                <img src='https://www.americanoceans.org/wp-content/uploads/2021/04/number-of-oceans.jpg'/>
            </div>

            <div className={classes.descriptionBlock}>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;