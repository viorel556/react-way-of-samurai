import {createSelector} from "reselect";

export const getAllUsers = (state) => { // primitive selector;
    return state.usersPage.users;
}

// TODO [􀣋]: MAKE A COMPLEX SELECTOR FOR THE USERS YOU FOLLOW;

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => { // primitive selector;
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}