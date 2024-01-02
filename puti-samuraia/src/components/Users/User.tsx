import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import React from "react";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types.ts";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unfollowUser: (userId: number) => void
    followUser: (userId: number) => void
}

// just renders stuff:
// FIXME[EASY]
const User: React.FC<PropsType> = ({user, followingInProgress, unfollowUser, followUser}) => {


    return (

        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto} alt={'image profile'}/>
                    </NavLink>
                </div>

                <div>
                    {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => {
                                                 // CALLING A THUNK:
                                                 unfollowUser(user.id);
                                             }}>Unfollow</button>

                                    : <button disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            // CALLING A THUNK:
                                            followUser(user.id)
                                        }}>Follow</button>}
                </div>
            </span>


            <span>
                <span>
                    <div>{user.name}</div> <div>{user.status}</div>
                </span>

                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>


    );
}

export default User;