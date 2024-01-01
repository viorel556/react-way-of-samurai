import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getAllUsers = (state: AppStateType) => { // primitive selector;
    return state.usersPage.users;
}

// TODO [􀣋]: MAKE A COMPLEX SELECTOR FOR THE USERS YOU FOLLOW;

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => { // primitive selector;
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}