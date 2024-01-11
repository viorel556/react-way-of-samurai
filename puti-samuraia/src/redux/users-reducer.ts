import {see, updateObjectInArray} from "../utils/object-helpers";
import {GetStateType, UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store.ts";
import {Dispatch} from "redux";
import {ThunkAction} from 'redux-thunk';
import {usersApi} from "../api/users-api.ts";

export type ThunkType = BaseThunkType<ActionTypes>

// COMBINING ACTION TYPES
type ActionTypes = InferActionsType<typeof actions>
export const actions = {
    follow: (userId: number) => ( {type: "FOLLOW", userId} as const),
    unfollow: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    loadUsers: (users: Array<UserType>) => ({type: "LOAD_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => (
        {
            type: "TOGGLE_IS_FOLLOWING_PROGRESS",
            isFetching,
            userId
        } as const
    ),
}

 // [!] USING THE INFERENCE TYPE ASSIGMENT APPROACH:
// "InitialStateType" is created based on "initialState"
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users IDs
}
type InitialStateType = typeof initialState; // [!] inference type assignment;

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
         // we COPY the state
        // we CHANGE only the "followed" parameter if the ID matches;
        case "FOLLOW": {
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

        case "UNFOLLOW": {
            return { // THIS IS A STATE COPY:
                ...state,

                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: false})
            }
        }

        case "LOAD_USERS": {
            return {
                ...state,
                users: action.users,
            }
        }

        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case "SET_TOTAL_USERS_COUNT": {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }

        case "TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default: return state;
    }
}

// THUNKS ARE HERE:
export const getUsers = (page: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    // to pass params to a Thunk we have to create a thunk Creator;
    try {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        // server request to get initial users
        let data = await usersApi.requestUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.loadUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
    catch (error) { see(error) }
}

// EXTERNAL FUNCTIONAL (INTERNAL):
async function _followUnfollowFlow(dispatch: Dispatch<ActionTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionTypes) {
    // func was created to avoid code doubling; encapsulates follow/unfollow logic;
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

 // THUNK:
// TYPIFICATION IS DONE ACCORDING REDUX-THUNK DOCUMENTATION
export const followUser = (userId: number): ThunkType => async (dispatch) => {
    try {
        let apiMethod = usersApi.requestFollowUser.bind(usersApi);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.follow);
    }
    catch (error) { see(error); }
}

 // THUNK:
// TYPIFICATION IS DONE ACCORDING REDUX-THUNK DOCUMENTATION
export const unfollowUser = (userId: number): ThunkType => async (dispatch) => {
    try {
        let apiMethod = usersApi.requestUnfollowUser.bind(usersApi);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollow);
    }
    catch (error) { see(error); }
}


export default usersReducer;