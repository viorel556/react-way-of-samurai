
const FOLLOW = "FOLLOW";
const UNFOLLOW= "UNFOLLOW";
const LOAD_USERS = "LOAD_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";


let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 3
}
const usersReducer = (state=initialState, action) => {

    switch (action.type) {

        // we COPY the state
        // we CHANGE only the "followed" parameter if the ID matches;
        case FOLLOW: {
            return { // THIS IS A STATE COPY:
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                }) // iterating and returning same array;
            }
        }

        case UNFOLLOW: {
            return { // THIS IS A STATE COPY:
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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



        default:
            return state;
    }
}

export const followAC = (userId) => (
    {type: FOLLOW, userId }
);

export const unfollowAC = (userId) => (
    {type: UNFOLLOW, userId  }
);

export const loadUsersAC = (users) => (
    // LOADS THE USERS ON THE SCREEN; FUCKING RENDERS THEM;
    {type: LOAD_USERS, users }
);

export const setCurrentPageAC = (currentPage) => (
    {type: SET_CURRENT_PAGE, currentPage}
);

export const setUsersTotalCountAC = (totalUsersCount) => (
    {type: SET_TOTAL_USERS_COUNT, count:totalUsersCount}
)




export default usersReducer;

