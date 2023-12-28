// ACTIONS:
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "samurai-network/auth/SET_AUTH_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";

// DECLARING TYPES:
export type InitialStateType = {
    // all types of the initial state:
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    // [!] if we change "data" -> "payload" it doesn't work for some reason;
    type: typeof SET_AUTH_USER_DATA,
    data: SetAuthUserDataActionPayloadType
}
type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA,
    captcha: string
}
type AuthCredentialsType = {
    // WRITTEN BY MYSELF CONSIDERING I HAVE A DIFFERENT IMPLEMENTATION OF THE THUNK;
    login: string
    password: string
    rememberMe: boolean
}

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
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case SET_AUTH_USER_DATA:

            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA:

            return {
                ...state,
                captcha: action.captcha
            }

        default:
            return state;
    }
}

export const setCaptcha = (captcha: string): SetCaptchaActionType => {
    return (
        {
            type: SET_CAPTCHA,
            captcha
        }
    );
};

export const setAuthUserData = (userId: number | null, email: string | null,
                                login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return (
        {
            type: SET_AUTH_USER_DATA,
            data: {userId, email, login, isAuth}
        }
    );
};

// THUNKS ARE HERE:
export const authorizeMe = () => async (dispatch: any) => {
    // MAKES AN AUTHORIZATION REQUEST TO THE SERVER WITH THE COOKIES
    try {
        let response = await profileAPI.authorizeMeRequest();
        if (response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
    catch (error) {
        console.log(error);
    }
}

// THUNK (login):
export const authorizeWithCredentials = (formData: AuthCredentialsType) => async (dispatch: any) => {

    let response = await profileAPI.requestAuthorizeWithCredentials(formData);

    if (response.data.resultCode === 0) {

        let email = formData.login;
        let id = response.data.data.userId;
        let login = formData.login;

        dispatch(setAuthUserData(id, email, login, true));
        alert("SUCCESSFULLY LOGGED IN! WELCOME TO MY SOCIAL NETWORK!");

    } else if (response.data.resultCode === 10) {

        profileAPI.requestCaptcha()
            .then(response => {
                if (response.status === 200) {
                    dispatch(setCaptcha(response.data.url));
                }
            });
    } else {
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error";

        let action = stopSubmit('login', {_error: message});
        dispatch(action);
    }
}

// THUNK (logout):
export const logOut = () => async (dispatch: any) => {
    try {
        let response = await profileAPI.requestLogOut();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
            alert("YOU HAVE LOGGED OUT! GOODBYE!");
        }
    }
    catch (error) { console.log(error); }
}

export default authReducer;