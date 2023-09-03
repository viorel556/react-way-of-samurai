import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = () => {

    let postsData = [
        { id: 1, message: "Hey how are you!?!", likesCount: 20 },
        { id: 2, message: "This is my first post  ", likesCount: 10 },
    ];

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
                <Post message={ postsData[0].message } likes= { postsData[0].likesCount }/>
                <Post message={ postsData[1].message } likes= { postsData[1].likesCount }/>
            </div>

        </div>
    );
}

export default MyPosts;
