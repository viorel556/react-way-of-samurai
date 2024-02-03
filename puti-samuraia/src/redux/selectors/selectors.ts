import {AppStateType} from "../redux-store.ts";

// AUTHORIZATION SELECTORS:
export const getCaptcha = (state: AppStateType) => { return state.auth.captcha; }
export const getIsAuth = (state: AppStateType) => { return state.auth.isAuth; }
export const getLoginData = (state: AppStateType) => { return state.auth.login; }

// CHAT SELECTORS:
export const getMessages = (state: AppStateType) => { return state.chat.messages; }
export const getWebSocketStatus = (state: AppStateType) => { return state.chat.status; }

// DIALOGS SELECTORS:
export const getDialogsPage = (state: AppStateType) => { return state.dialogsPage; }

// PROFILE SELECTORS:
export const getProfile = (state: AppStateType) => { return state.profilePage.profile; }
export const getStatus = (state: AppStateType) => { return state.profilePage.status; }
export const getAuthorizedUserId = (state: AppStateType) => { return state.auth.userId; }

// USERS SELECTORS:
export const getAllUsers = (state: AppStateType) => { return state.usersPage.users; }
export const getPageSize = (state: AppStateType) => { return state.usersPage.pageSize; }
export const getTotalUsersCount = (state: AppStateType) => { return state.usersPage.totalUsersCount; }
export const getCurrentPage = (state: AppStateType) => { return state.usersPage.currentPage; }
export const getIsFetching = (state: AppStateType) => { return state.usersPage.isFetching; }
export const getFollowingInProgress = (state: AppStateType) => { return state.usersPage.followingInProgress; }
export const getUsersFilter = (state: AppStateType) => { return state.usersPage.filter; }

// POSTS SELECTORS:
export const getPosts = (state: AppStateType) => { return state.profilePage.posts; }
export const getNewPostText = (state: AppStateType) => { return state.profilePage.newPostText;}