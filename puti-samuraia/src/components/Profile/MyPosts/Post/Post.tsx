import React from "react";
import classes from './Post.module.css';
import {see} from "../../../../utils/object-helpers";
import {PostType} from "../../../../types/types.ts";



const Post: React.FC<PostType> = (props) => {

    return (
        <>
            <div className={classes.item} >
                <img src='https://www.boxofficepro.com/wp-content/uploads/2022/12/Avatar-The-Way-of-Water-Loak-1324x1536.jpg' />
                { props.message }
                <div>
                    <span> {props.likes} likes </span>
                </div>
            </div>
        </>
    );
}

export default Post;