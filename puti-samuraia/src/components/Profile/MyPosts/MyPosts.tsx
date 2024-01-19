import React, {FC, NamedExoticComponent, PureComponent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import AddNewPostFormRedux from "./AddNewPostForm/AddNewPostForm";
import {see} from "../../../utils/object-helpers.ts";
import {PostsType, PostType} from "../../../types/types.ts";
import {useAppDispatch} from "../../../redux/redux-store.ts";
import {actions} from "../../../redux/profile-reducer.ts";
import {useSelector} from "react-redux";
import {getNewPostText, getPosts} from "../../../redux/selectors/other-selectors.ts";
const {addPostActionCreator} = actions;

type AddPostType = (newPostText: string) => void

const MyPosts: FC = React.memo(props => {
    const dispatch = useAppDispatch();

    // SELECTORS:
    const posts = useSelector(getPosts);
    const newPostText = useSelector(getNewPostText);

    function addPost(newPostText) {
        dispatch(addPostActionCreator(newPostText));
    }

    // mapping data
    let myPosts =
        posts.map(pst => <Post key={pst.id} message={pst.message} likes={pst.likesCount}/>)

    let onAddPost = (values: any) => {
        addPost(values.newPostText);
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