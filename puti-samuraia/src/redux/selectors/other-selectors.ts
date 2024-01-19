import {AppStateType} from "../redux-store.ts";

export const getCaptcha = (state: AppStateType) => {
    return state.auth.captcha;
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}