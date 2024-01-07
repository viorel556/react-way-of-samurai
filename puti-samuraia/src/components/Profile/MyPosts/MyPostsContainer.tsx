import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostsType} from "../../../types/types.ts";
import {AppStateType} from "../../../redux/redux-store.ts";
import { Dispatch } from 'redux';
import { actions } from "../../../redux/profile-reducer";
const {addPostActionCreator} = actions; // extracting just this method from the actions object;

// DEFINING TYPES:
type MapStateToPropsType = (state: AppStateType) => {
        posts: Array<PostsType>,
        newPostText: string
}
interface AddPostInterface { addPost: (newPostText: string) => void } // FIXME[!] We might want to edit this. Looks wrong;
type MapDispatchToPropsType = (dispatch: Dispatch) => AddPostInterface;

let mapStateToProps: MapStateToPropsType  = (state) =>  {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps: MapDispatchToPropsType = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch( addPostActionCreator(newPostText) );
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
