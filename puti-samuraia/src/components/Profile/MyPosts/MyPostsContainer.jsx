import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let state = props.store.getState();

    let addPost = () => { // FIXATES the current value in textarea and adds a post;
        props.store.dispatch( addPostActionCreator() );
    };

    let onPostChange = (text) => { // func LISTENS and UPDATES "newPostText" in BLL;
        let action = updateNewPostTextActionCreator(text)
        props.store.dispatch( updateNewPostTextActionCreator(text) );
    }

    return (<MyPosts updateNewPostText={onPostChange}
                     addPost={ addPost }
                     posts={ state.profilePage.posts }
                     newPostText={ state.profilePage.newPostText }
                    />);
}


export default MyPostsContainer;
