import React from "react";
import classes from './Post.module.css';


const Post = () => {
    return (
        <>
            <div className={classes.posts}>
                <div className={classes.item} >
                    <img src='https://www.boxofficepro.com/wp-content/uploads/2022/12/Avatar-The-Way-of-Water-Loak-1324x1536.jpg' />
                    Post 1
                    <div>
                        <span> like </span>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Post;
