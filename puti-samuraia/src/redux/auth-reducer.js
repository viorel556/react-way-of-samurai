// ACTIONS:
import {profileAPI} from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
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
                ...action.data,
                isAuth: true
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha:  action.captcha
            }



        default:
            return state;
    }
}

export const setCaptcha = (captcha) => (
    {type: SET_CAPTCHA, captcha}
)

export const setAuthUserData = (userId, email, login) => (
    {
        type: SET_AUTH_USER_DATA,
        data: {userId, email, login}
    }
);


// THUNKS ARE HERE:
export const authorizeMe = () => {
    // MAKES AN AUTHORIZATION REQUEST TO THE SERVER WITH THE COOKIES
    return (dispatch) => {
        profileAPI.authorizeMeRequest()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {email, id, login} = response.data.data;
                    dispatch(setAuthUserData(email, id, login));
                }
            });
    }
}
// THUNK:
export const authorizeWithCredentials = (formData) => {

    return (dispatch) => {
        profileAPI.requestAuthorizeWithCredentials(formData)
            .then(response => {
                if (response.data.resultCode === 0) {
                    let email = formData.login
                    let id = response.data.userId
                    let login = formData.login

                    dispatch(setAuthUserData(email, id, login))
                    alert("YOU HAVE SUCCESFULLY LOGGED IN")

                } else if (response.data.resultCode === 10) {

                    profileAPI.requestCaptcha()
                        .then(response => {
                            if (response.status === 200) {
                                dispatch(setCaptcha(response.data.url))
                            }
                        });
                }
            })
    }
}

// export const getCaptcha = () => {
//
//     return (dispatch) => {
//         profileAPI.requestCaptcha()
//             .then(response => {
//                 if (response.status === 200) {
//                     dispatch(setCaptcha(response.data.url))
//                 }
//             });
//     }
// }

export default authReducer;