
// ACTIONS:
import {profileAPI} from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

// INITIAL STATE:
let initialState = {
    userId: null,
    email: null,
    login: null,

    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_AUTH_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => (
    {
        type: SET_AUTH_USER_DATA,
        data: { userId, email, login }
    }
);

// THUNKS ARE HERE:
export const authorizeMe = () => {
    // MAKES AN AUTHORIZATION REQUEST TO THE SERVER WITH THE COOKIES
    return (dispatch) => {
        profileAPI.authorizeMeRequest()
            .then(response => {
                if (response.data.resultCode === 0 ) {
                    let {email, id, login} = response.data.data;
                    dispatch( setAuthUserData(email, id, login) );
                }
            });
    }
}

export default authReducer;