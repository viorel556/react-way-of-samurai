import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store.ts";
import {ThunkAction} from 'redux-thunk';
import {GetUsersResponseType} from "../api/api-types.ts";
import {see} from "../utils/object-helpers.ts";
import {profileApi} from "../api/profile-api.ts";
import {ResultCodeEnum} from "../api/api.ts";

// INITIAL STATE TYPE:
type InitialStateType = {
    posts: PostsType[]
    profile: ProfileType
    status: string
    newPostText?: string // indicating that this might NOT appear;
}

// THE DISPATCH TYPE:
type DispatchType = Dispatch<ActionTypes>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkType = BaseThunkType<ActionTypes | FormAction> // that form action is something ultra general Action Type;

export const actions = {
    addPostActionCreator: (newPostText: string) => ( {type: "ADD_POST", newPostText} as const),
    setUserProfileAction : (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
    setStatusAction: (status: string) => ({type: "SET_STATUS", status} as const),
    deletePostAction: (postId: number) => ({type: "DELETE_POST", postId} as const),
    savePhotoSuccessAction: (photos: PhotosType) => ({type: "SAVE_PHOTO_SUCCESS", photos} as const)
}
type ActionTypes = InferActionsType<typeof actions>


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
const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case "ADD_POST": {
            // new post parameters
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return { // THIS IS A STATE COPY;
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            }
        }

        case "SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }

        case "SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }

        case "DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }

        case "SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }

        default: return state;
    }
}


// THUNKS ARE HERE:
export const getUser = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    try {
        let response = await profileApi.requestUser(userId)
        dispatch(actions.setUserProfileAction(response.data));
    }
    catch (error) { see(error) }
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    try {
        let response = await profileApi.requestUserStatus(userId);
        dispatch(actions.setStatusAction(response.data));
          // [!] IMPORTANT
         // this is wild but for some stupid reason the server just returns as payload:
        // "Status is here" <- a string fucking object without a key not a json;
    }
    catch (error) { see(error) }
}

export const updateMyStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
    try {
        let response = await profileApi.requestUpdateUserStatus(status)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatusAction(status));
        }
    }
    catch (error) { see(error) }
}

export const savePhoto = (file: File): ThunkType => async (dispatch: DispatchType) => {
    try {
        let response = await profileApi.requestSavePhoto(file);
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.savePhotoSuccessAction(response.data.data.photos));
        }
    }
    catch (error) { see(error) }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    try {
        const userId = getState().auth.userId;
        const response = await profileApi.requestSaveProfileData(profile);
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(getUser(userId));
        }
        else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }
    }
    catch (error) { see(error) }
}

export default profileReducer;