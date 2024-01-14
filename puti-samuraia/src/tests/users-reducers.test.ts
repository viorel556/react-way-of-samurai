// USERS REDUCERS TESTS

import {UserType} from "../types/types.ts";
import usersReducer, {actions, InitialStateType} from "../redux/users-reducer.ts";

// STEP 1: DEFINING THE INITIAL STATE:
let state: InitialStateType;

beforeEach( () => {
    // MAKING THIS TO NULLIFY THE STATE AFTER EACH TEST:
    state = {
        users: [
            {   // TEST USER 1:
                id: 0, name: "Michael Scott", followed: false,
                photos: {small: null, large: null}, status: "Status 1"
            },

            {   // TEST USER 2:
                id: 1, name: "Dwight Schrute", followed: false,
                photos: {small: null, large: null}, status: "Status 2"
            },

            {   // TEST USER 3:
                id: 2, name: "Jim Halpert", followed: true,
                photos: {small: null, large: null}, status: "Status 3"
            },

            {   // TEST USER 4:
                id: 3, name: "Pam Beesly", followed: false,
                photos: { small: null, large: null }, status: "Status 3"
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
});

test("Follow", () => {

    // STEP 2: IMPLEMENTING THE FUNCTIONAL ON TEST CASES

    // Following Dwight:
    const newState = usersReducer(state, actions.follow(1));

    // STEP 3: WRITING THE EXPECT STATEMENT:
    expect(newState.users[0].followed).toBeFalsy();   // what has to be unchanged REMAINS unchanged;
    expect(newState.users[1].followed).toBeTruthy(); // checking if Dwight is followed now;

});

test( "Unfollow", () => {

    // Unfollowing Jim;
    const newState = usersReducer(state, actions.unfollow(2));

    // checking if Dwigth is unfollowed (it should be unfollowed since we have RESET the state)
    expect(newState.users[1].followed).toBeFalsy();

    // checking if Jim was unfollowed:
    expect(newState.users[2].followed).toBeFalsy();
});