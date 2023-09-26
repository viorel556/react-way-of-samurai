
const FOLLOW = "FOLLOW";
const UNFOLLOW= "UNFOLLOW";
const LOAD_USERS = "LOAD_USERS"


let initialState = {
    users: [ ]
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
                users: [
                    ...state.users, ...action.users
                ]
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


export default usersReducer;

