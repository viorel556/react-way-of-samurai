//import {authorizeMe, setAuthUserData} from "./auth-reducer.ts";
import {authorizeMe} from "./auth-reducer";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store.ts";
import {Dispatch} from "redux";
import {ThunkAction} from 'redux-thunk';


// INITIAL STATE:
let initialState = {
    initialized: false
}
// GETTING THE INITIAL STATE TYPE:
export type InitialStateType = typeof initialState;


export const actions = {
    initializedSuccessfully: ()  => ({type: "APP/INITIALIZED_SUCCESSFULLY"}) as const
}

// DEFINING THE ACTIONS TYPE:
type ActionsType = InferActionsTypes<typeof actions>
// DEFINING THE DISPATCH TYPE:
type DispatchType = Dispatch<ActionsType>
// DEFINING THE THUNK TYPE
type ThunkType = BaseThunkType<ActionsType>

 // THUNK:
// FIXME[HARD]: TS TRANSLATION
export const initializeApp = () => (dispatch) => {
    // creating a promise:
    let promise = dispatch(authorizeMe());

    Promise.all([promise])
        .then(() => {
            // [!] WHEN ALL THE PROMISES ABOVE ARE DONE -> CODE BELLOW WILL FOLLOW:
            dispatch(actions.initializedSuccessfully());
        });
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "APP/INITIALIZED_SUCCESSFULLY":
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}



export default appReducer;