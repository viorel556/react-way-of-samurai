import React, {FC} from "react";
import classes from './Post.module.css';
import {see} from "../../../../utils/object-helpers";
import {PostType} from "../../../../types/types.ts";
import userPhoto from "../../../../assets/images/user.png";




const Post: FC<PostType> = (props) => {

    return (
        <div>
            <div className={classes.item}>
                <div className={classes.imageAndMessage}>
                    <img src={userPhoto} />
                    <p className={classes.message}>{ props.message }</p>
                </div>

                <span> {props.likes} likes </span>
            </div>
        </div>
    );
}

export default Post;