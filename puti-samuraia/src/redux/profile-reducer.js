import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

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

// THUNKS ARE HERE:
export const getUser = (userId) => async (dispatch) => {
    let response = await profileAPI.requestUser(userId)

    dispatch(setUserProfile(response.data));
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


export default profileReducer;
