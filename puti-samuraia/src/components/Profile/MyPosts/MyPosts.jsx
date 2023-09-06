import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = (props) => {

    let posts = props.data

    let myPosts = posts
        .map( pst => <Post message={ pst.message } likes={ pst.likesCount } />  )

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
                { myPosts }
            </div>

        </div>
    );
}

export default MyPosts;
