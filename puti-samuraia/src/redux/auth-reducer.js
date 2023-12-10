// ACTIONS:
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "samurai-network/auth/SET_AUTH_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA"

// INITIAL STATE:
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: ''
}

const authReducer = (state = initialState, action) => {
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

export const setCaptcha = (captcha) => (
    {type: SET_CAPTCHA, captcha}
)

export const setAuthUserData = (userId, email, login, isAuth) => (
    {
        type: SET_AUTH_USER_DATA,
        data: {userId, email, login, isAuth}
    }
);


// THUNKS ARE HERE:
export const authorizeMe = () => async (dispatch) => {
    // MAKES AN AUTHORIZATION REQUEST TO THE SERVER WITH THE COOKIES
    let response = await profileAPI.authorizeMeRequest()

    if (response.data.resultCode === 0) {
        let {email, id, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}
// THUNK:
export const authorizeWithCredentials = (formData) => async (dispatch) => {
    let response = await profileAPI.requestAuthorizeWithCredentials(formData);

    if (response.data.resultCode === 0) {
        // FIXME: this can be optimized;
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
        let message =
            response.data.messages.length > 0 ?
                response.data.messages[0]
                : "Some error";

        let action = stopSubmit('login', {_error: message});
        dispatch(action);
    }


}

// THUNK:
export const logOut = () => async (dispatch) => {
    let response = await profileAPI.requestLogOut();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
        alert("YOU HAVE LOGGED OUT! GOODBYE!");
    }
}

export default authReducer;