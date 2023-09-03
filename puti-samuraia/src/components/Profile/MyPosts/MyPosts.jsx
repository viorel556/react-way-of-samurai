import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = () => {
    return (
        <div className={classes.postsBlock}>

            <h3> My Posts </h3>
            <div>

                <div>
                    <textarea> </textarea>
                </div>

                <div>
                    <button>Add Post</button>
                </div>

            </div>


            <div className={classes.posts}>

                <Post message='Hi, how are you?' likes='3'/>
                <Post message="Its my first post here!" likes='19'/>

            </div>

        </div>
    );
}

export default MyPosts;
