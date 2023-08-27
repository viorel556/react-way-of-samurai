import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";



const MyPosts = () => {
    return (
        <>
            My Posts
            <div>
                <textarea> </textarea>
                <button>Add Post</button>
            </div>


            <div className={classes.posts}>

                <Post message='Hi, how are you?' likes='3'/> 
                <Post message="Its my first post here!" likes='19'/>

            </div>
        </>
    );
}

export default MyPosts;
