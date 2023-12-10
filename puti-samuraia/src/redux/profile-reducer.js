import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState =
    {
        posts: [
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 2, message: "MOLDOVA RULES! ", likesCount: 1000},
            {id: 3, message: "This is my first post  ", likesCount: 10}
        ],
        profile: null,
        status: ""
    }

const profileReducer = (state = initialState, action) => {

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
                profile: {...state.profile, photos: action.photos }
            }
        }

        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => (
    {type: ADD_POST, newPostText}
);

export const setUserProfile = (profile) => (
    {type: SET_USER_PROFILE, profile}
);

export const setStatus = (status) => (
    {type: SET_STATUS, status}
);

export const deletePost = (postId) => (
    {type: DELETE_POST, postId}
);

export const savePhotoSuccess = (photos) => (
    {type: SAVE_PHOTO_SUCCESS, photos }
)

// THUNKS ARE HERE:
export const getUser = (userId) => async (dispatch) => {
    // FIXME[EASY]: We're missing error handling in our project as per bellow example:

    try {
        let response = await profileAPI.requestUser(userId)
        dispatch(setUserProfile(response.data));
    }
    catch (error) {
        console.log(error)
        // or maybe show some window with that;
        // we will be able to access the error somehow because we caught it;
    }

}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.requestUserStatus(userId)

    dispatch(setStatus(response.data));
}

export const updateMyStatus = (status) => async (dispatch) => {
    let response = await profileAPI.requestUpdateUserStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.requestSavePhoto(file);

    if (response.data.resultCode === 0 ) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (formData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.requestSaveProfileData(formData);

    if (response.data.resultCode === 0 ) {
        dispatch(getUser(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}


export default profileReducer;
