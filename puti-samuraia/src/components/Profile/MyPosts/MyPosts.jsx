import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = (props) => {

    // mapping data:
    let myPosts = props.posts
        .map( pst => <Post message={pst.message} likes={pst.likesCount}/> )

    let newPostElement = React.createRef();

    let addPost = () => {

        let text=newPostElement.current.value;

        alert(text)
    };

    return (
        <div className={classes.postsBlock}>

            <h3> My Posts </h3>
            <div>

                <div>
                    <textarea ref={ newPostElement }> </textarea>
                </div>

                <div>
                    <button onClick={ addPost } >Add Post</button>
                </div>

            </div>

            <div className={classes.posts}>
                { myPosts }
            </div>

        </div>
    );
}

export default MyPosts;
