import React from "react";
import classes from './Profile.module.css'; 
import MyPosts from "./MyPosts/MyPosts";


const Profile = () => { 
    return ( 
        <div className={classes.content}>

            <img src='https://www.americanoceans.org/wp-content/uploads/2021/04/number-of-oceans.jpg'/>  

            <div> ava + description   

            </div>

            <MyPosts /> 

        </div>
    ); 
}

export default Profile;