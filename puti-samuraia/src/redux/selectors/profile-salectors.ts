import {AppStateType} from "../redux-store.ts";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.userId;
}



