import {authorizeMe, setAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESSFULLY = "INITIALIZED_SUCCESSFULLY";

// INITIAL STATE:
let initialState = {
    initialized: false,
    globalError: null // FIXME[MEDIUM] this needs to be DISPATCHED IN STORE;
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case INITIALIZED_SUCCESSFULLY:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializedSuccessfully = () => (
    {type: INITIALIZED_SUCCESSFULLY}
)


// THUNK:
export const initializeApp = () => (dispatch) => {
    // creating a promise:
    let promise = dispatch(authorizeMe());

    Promise.all([promise])
        .then(() => { // 􀐫
            // 􀇾 WHEN ALL THE PROMISES ABOVE ARE DONE -> CODE BELLOW WILL FOLLOW:
            dispatch(initializedSuccessfully());
        });
}

export default appReducer;