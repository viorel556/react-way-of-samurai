import {AppStateType} from "../redux-store.ts";

export const getCaptcha = (state: AppStateType) => {
    return state.auth.captcha;
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getLoginData = (state: AppStateType) => {
    return state.auth.login;
}

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}

export const getNewPostText = (state: AppStateType) => {
    return state.profilePage.newPostText;
}