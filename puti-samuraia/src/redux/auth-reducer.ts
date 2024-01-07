// ACTIONS:
import {profileAPI } from "../api/api"
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./redux-store.ts";
import {ThunkAction} from 'redux-thunk';
import {see} from "../utils/object-helpers.ts";
import {ResultCodeEnum} from "../api/ApiTypes.ts";


// DECLARING TYPES:
export type InitialStateType = {
    // all types of the initial state:
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}
// ACTION TYPES:
type SetCaptchaActionType = {
    type: "SET_CAPTCHA",
    captcha?: string
}
export type AuthCredentialsType = {
    // WRITTEN BY MYSELF CONSIDERING I HAVE A DIFFERENT IMPLEMENTATION OF THE THUNK;
    login: string
    password: string
    rememberMe: boolean
}

type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const actions = {
    setCaptcha: (captcha: string): SetCaptchaActionType => { //
        return (
            {
                type: "SET_CAPTCHA",
                captcha
            } as const
        );
    },

    setAuthUserData: (userId: number | null,
                      email: string | null,
                      login: string | null,
                      isAuth: boolean) => {
        return (
            {
                type: "SET_AUTH_USER_DATA",
                data: {userId, email, login, isAuth}
            } as const
        );
    }
}

type ActionTypes = InferActionsTypes<typeof actions>


// DECLARING THE INITIAL STATE:
let initialState: InitialStateType = {
    // [!] the author declares this type differently;
    // via a variable assigment;
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: ''
}

// THE MAIN REDUCER:
const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case "SET_AUTH_USER_DATA":
            return {
                ...state,
                ...action.data
            }

        case "SET_CAPTCHA":
            return {
                ...state,
                captcha: action.captcha
            }

        default: return state;
    }
}


// THUNKS ARE HERE:
export const authorizeMe = (): ThunkType => async (dispatch: DispatchType) => {
    // MAKES AN AUTHORIZATION REQUEST TO THE SERVER WITH THE COOKIES
    try {
        let response = await profileAPI.authorizeMeRequest();

        if (response.data.resultCode === ResultCodeEnum.Success) {
            let {email, id, login} = response.data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
    catch (error) { see(error); }
}

// THUNK (login):
export const authorizeWithCredentials = (formData: AuthCredentialsType): ThunkType => async (dispatch: DispatchType) => {

    let response = await profileAPI.requestAuthorizeWithCredentials(formData);

    if (response.data.resultCode === ResultCodeEnum.Success) {

        let email = formData.login;
        let id = response.data.data.userId;
        let login = formData.login;

        dispatch(actions.setAuthUserData(id, email, login, true));
        alert("SUCCESSFULLY LOGGED IN! WELCOME TO MY SOCIAL NETWORK!");

    }
    else if (response.data.resultCode === ResultCodeEnum.CaptchaRequired) {

        profileAPI.requestCaptcha()
            .then(response => {
                if (response.status === 200) {
                    dispatch(actions.setCaptcha(response.data.url));
                }
            });
    }
    else {
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error occurred when getting messages";

        let action = stopSubmit('login', {_error: message});
        dispatch(action);
    }
}

// THUNK (logout):
export const logOut = (): ThunkType => async (dispatch: DispatchType) => {
    try {
        let response = await profileAPI.requestLogOut();
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
            alert("YOU HAVE LOGGED OUT! GOODBYE!");
        }
    }
    catch (error) { see(error) }
}

export default authReducer;