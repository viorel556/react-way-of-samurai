//import {authorizeMe, setAuthUserData} from "./auth-reducer.ts";
import {authorizeMe} from "./auth-reducer";
const INITIALIZED_SUCCESSFULLY = "INITIALIZED_SUCCESSFULLY";

// DECLARING TYPES:
export type InitialStateType = {
    initialized: boolean
}
type InitializedSuccessfullyActionType = {
    type: typeof INITIALIZED_SUCCESSFULLY
}


// INITIAL STATE:
let initialState: InitialStateType = {
    initialized: false,
}
const appReducer = (state = initialState, action: any): InitialStateType => {

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

export const initializedSuccessfully = ():InitializedSuccessfullyActionType => ({type: INITIALIZED_SUCCESSFULLY});

// THUNK:
// FIXME[HARD]: TS TRANSLATION
export const initializeApp = () => (dispatch: any) => {
    // creating a promise:
    let promise = dispatch(authorizeMe());

    Promise.all([promise])
        .then(() => {
            // [!] WHEN ALL THE PROMISES ABOVE ARE DONE -> CODE BELLOW WILL FOLLOW:
            dispatch(initializedSuccessfully());
        });
}

export default appReducer;