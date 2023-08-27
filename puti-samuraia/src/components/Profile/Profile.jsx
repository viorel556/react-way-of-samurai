import React from "react";
import classes from './Profile.module.css'; 


const Profile = () => { 
    return ( 
        <div className={classes.content}>

            <img src='https://www.americanoceans.org/wp-content/uploads/2021/04/number-of-oceans.jpg'/>  

            <div> ava + description 
                <div> 
                {/* <img src='https://1fid.com/wp-content/uploads/2022/06/Twitter-profile-picture-4-1024x1024.jpg' />   */}
                </div> 

            </div>

            <div> 
            My posts 
                <div> New Post </div>
                <div className={classes.posts}> 
                    <div className={classes.item} > Post 1 </div>
                    <div className={classes.item}> Post 2 </div>     
                </div>

            </div> 
        </div>
    ); 
}

export default Profile;