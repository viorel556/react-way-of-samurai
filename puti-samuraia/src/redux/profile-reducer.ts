import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

// INITIAL STATE RELATED TYPES:
type InitialStateType = {
    posts: PostsType[]
    profile: ProfileType
    status: string
    newPostText?: string // indicating that this might NOT appear;
}

// ACTION CREATOR TYPES:
type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}


let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hey how are you!?!", likesCount: 20},
        {id: 2, message: "MOLDOVA RULES! ", likesCount: 1000},
        {id: 3, message: "This is my first post  ", likesCount: 10}
    ],
    profile: null, // [!] treat it as ProfileType, if it doesn't exist, as null;
    status: ""
}

// PROFILE REDUCER:
const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case ADD_POST: {
            // new post parameters
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };

            return { // THIS IS A STATE COPY;
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }

        default:
            return state;
    }
}

// ACTION CREATORS:
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => (
    {type: ADD_POST, newPostText}
);
export const setUserProfileAction = (profile: ProfileType): SetUserProfileActionType => (
    {type: SET_USER_PROFILE, profile}
);
export const setStatusAction = (status: string): SetStatusActionType => (
    {type: SET_STATUS, status}
);
export const deletePostAction = (postId: number): DeletePostActionType => (
    {type: DELETE_POST, postId}
);
export const savePhotoSuccessAction = (photos: PhotosType): SavePhotoSuccessActionType => (
    {type: SAVE_PHOTO_SUCCESS, photos}
);

// THUNKS ARE HERE:
export const getUser = (userId: number) => async (dispatch: any) => {
    try {
        let response = await profileAPI.requestUser(userId)
        dispatch(setUserProfileAction(response.data));
    } catch (error) {
        console.log(error)
    }
}
export const getUserStatus = (userId: number) => async (dispatch: any) => {
    try {
        let response = await profileAPI.requestUserStatus(userId)
        dispatch(setStatusAction(response.data));
    } catch (error) {
        console.log(error);
    }
}
export const updateMyStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.requestUpdateUserStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAction(status));
        }
    } catch (error) {
        console.log(error);
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    try {
        let response = await profileAPI.requestSavePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccessAction(response.data.data.photos));
        }
    } catch (error) {
        console.log(error);
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    try {
        const userId = getState().auth.userId;
        const response = await profileAPI.requestSaveProfileData(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUser(userId));
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default profileReducer;