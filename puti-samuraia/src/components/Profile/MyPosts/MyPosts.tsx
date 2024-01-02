import React, {NamedExoticComponent, PureComponent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import AddNewPostFormRedux from "./AddNewPostForm/AddNewPostForm";
import {see} from "../../../utils/object-helpers.ts";
import {PostsType, PostType} from "../../../types/types.ts";

type PropsType = {
        addPost: (newPostText: string) => void
        newPostText: string
        posts: Array<PostsType>
}

const MyPosts: React.FC<PropsType> = React.memo(props => {

        // mapping data
        let myPosts = props.posts.map(pst => <Post key={pst.id} message={pst.message} likes={pst.likesCount}/>)

        //let newPostElement = React.createRef();

        let onAddPost = (values: any) => {
            props.addPost(values.newPostText);
        };

        return (
            <div className={classes.postsBlock}>

                <h3> My Posts </h3>

                <AddNewPostFormRedux onSubmit={onAddPost}/>

                <div className={classes.posts}>
                    {myPosts}
                </div>
            </div>
        );

});


export default MyPosts;