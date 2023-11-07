import {createSelector} from "reselect";

export const getAllUsers = (state) => { // primitive selector;
    return state.usersPage.users;
}

/* FIXME: just for educational purposes on Reselect;
    DELETE once committed;
    Every createSelector expects:
    a) A primitive selector;
    b) the return value of that selector passed as parameter;
    c) the "selecting logic" - usually an arrow-func;
*/
export const getUsersSuperSelector = createSelector(
    getAllUsers, getIsFetching,
    // 􀄩              􀄩
    (users,       isFetching) => { return users.filter(u => true) }
)

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