import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import React from "react";
import {NavLink} from "react-router-dom";
import {followUser, unfollowUser} from "../../api/api";


// just renders stuff:
const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <button className={
                        props.currentPage === p && styles.selectedPage}
                                   onClick={(e) => {
                                       props.onPageChanged(p);
                                   }}>
                        {p}
                    </button>
                })}
            </div>

            {
                props.users.map(u => <div key={u.id}>
                            <span>
                                <div>
                                    <NavLink to={'/profile/'+ u.id}>
                                         <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                              className={styles.userPhoto}/>
                                    </NavLink>
                                </div>

                                <div>
                                    {u.followed ?
                                        <button onClick={() => {

                                            unfollowUser(u.id)
                                                .then(response => {
                                                    if (response.data.resultCode === 0) {
                                                        props.unfollow(u.id);
                                                    }
                                                });
                                        }
                                        }>Unfollow</button>

                                        : <button onClick={() => {
                                            followUser(u.id)
                                                .then(response => {

                                                    if (response.data.resultCode === 0) {
                                                        props.follow(u.id);
                                                    }
                                                });

                                        }}>Follow</button> }
                                </div>
                            </span>


                        <span>
                                <span>
                                    <div>{u.name}</div> <div>{u.status}</div>
                                </span>

                                <span>
                                    <div>{"u.location.country"}</div>
                                    <div>{"u.location.city"}</div>
                                </span>
                        </span>

                    </div>
                )
            }
        </div>
    );
}

export default Users;