import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const LOAD_USERS = "LOAD_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        // we COPY the state
        // we CHANGE only the "followed" parameter if the ID matches;
        case FOLLOW: {
            return { // THIS IS A STATE COPY:
                ...state,

                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: true})
                // iterating and returning same array;
            }
        }

        case UNFOLLOW: {
            return { // THIS IS A STATE COPY:
                ...state,

                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: false})

                // OLD LOGIC:
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            }
        }

        case LOAD_USERS: {
            return {
                ...state,
                users: action.users,
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

export const follow = (userId) => (
    {type: FOLLOW, userId}
);

export const unfollow = (userId) => (
    {type: UNFOLLOW, userId}
);

export const loadUsers = (users) => (
    // LOADS THE USERS ON THE SCREEN; FUCKING RENDERS THEM;
    {type: LOAD_USERS, users}
);

export const setCurrentPage = (currentPage) => (
    {type: SET_CURRENT_PAGE, currentPage}
);

export const setTotalUsersCount = (totalUsersCount) => (
    {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
);

export const toggleIsFetching = (isFetching) => (
    {type: TOGGLE_IS_FETCHING, isFetching}
);

export const toggleFollowingProgress = (isFetching, userId) => (
    {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
);


// THUNKS ARE HERE:
export const getUsers = (page, pageSize) => async (dispatch) => {
    // to pass params to a Thunk we have to create a thunk Creator;

    // THE THUNK ITSELF:
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    // server request to get initial users
    let data = await usersAPI.requestUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(loadUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));

}

// THUNK:
export const followUser = (userId) => async (dispatch) => {

    let apiMethod = usersAPI.requestFollowUser.bind(usersAPI);

    await followUnfollowFlow(dispatch, userId, apiMethod, follow)

}

export const unfollowUser = (userId) => async (dispatch) => {

    let apiMethod = usersAPI.requestUnfollowUser.bind(usersAPI);

    await followUnfollowFlow(dispatch, userId, apiMethod, unfollow);

}


// EXTERNAL FUNCTIONAL:
async function followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)  {
    // func was created to avoid code doubling; encapsulates follow/unfollow logic;
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export default usersReducer;