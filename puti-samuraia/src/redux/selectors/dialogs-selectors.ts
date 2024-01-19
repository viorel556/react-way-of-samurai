import {AppStateType} from "../redux-store.ts";

export const getDialogsPage = (state: AppStateType) => {
    return state.dialogsPage;
}