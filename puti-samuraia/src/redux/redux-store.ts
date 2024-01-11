import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer.ts";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer.ts";
import {ThunkAction} from 'redux-thunk';

let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
);

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

 // CREATING A THUNK-TYPE GENERIC (for thunks):
// R - return val; A - Action;
export type BaseThunkType<A extends Action, R=Promise<void>> =
   ThunkAction<R, AppStateType, unknown, A>

// HERE WE CREATE SOME ADVANCED SHIT TO DEDUCT THE TYPES OF OUR ACTION CREATORS:
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// HERE WE CREATE THE STORE:
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers( applyMiddleware(thunkMiddleware) )
);

// @ts-ignore
window.__store__ = store; // creating a globally available store;

export default store;

