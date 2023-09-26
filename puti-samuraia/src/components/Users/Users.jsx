import React from "react"
import UsersContainer from "./UsersContainer";
import styles from './users.module.css';

let Users = (props) => {

    // THIS SHIT HAS TO BE CHANGED
    // JUST POPULATE users array in "users-reducer.js" with the bellow array;
    // THAT SHOULD DO IT;
    if (props.users.length === 0 ) {
        props.loadUsers(
            [
                {
                    id: 1,
                    photoUrl: "https://images11.graziamagazine.ru/upload/img_cache/326/32663d820526714720dce74265bee92a_ce_2832x1486x0x120.jpg",
                    followed: false,
                    fullName: "Dmitrii",
                    status: "I am a Boss!",
                    location: { city: "Minsk", country: "Belarus" },
                },

                {
                    id: 2,
                    photoUrl: "https://images11.graziamagazine.ru/upload/img_cache/326/32663d820526714720dce74265bee92a_ce_2832x1486x0x120.jpg",
                    fullName: "Felicia",
                    followed: false,
                    status: "I am a Freelancer!",
                    location: { city: "Chisinau", country: "Moldova" },
                },

                {
                    id: 3,
                    photoUrl: "https://images11.graziamagazine.ru/upload/img_cache/326/32663d820526714720dce74265bee92a_ce_2832x1486x0x120.jpg",
                    followed: true,
                    fullName: "Mozgan",
                    status: "I am a smort!",
                    location: { city: "Stutgart", country: "Germany" },
                },
            ]
        );
    }



    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photoUrl} className={styles.userPhoto}/>
                            </div>

                            <div>
                                { u.followed ?
                                    <button onClick={() => {props.unfollow(u.id)} }>Unfollow</button>
                                    : <button onClick={() => {props.follow(u.id)} }>Follow</button> }
                            </div>
                        </span>


                        <span>
                            <span>
                                <div>{u.fullName}</div> <div>{u.status}</div>
                            </span>

                            <span>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    );
}

export default Users;

