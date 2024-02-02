import {AppStateType} from "../redux-store.ts";


 // FIXME[EASY] We might want to refactor this INTO other-selectors.ts file;
// you can also consider grouping selectors in one single file but make sure to comment sections;
export const getMessages = (state: AppStateType) => {
    return state.chat.messages;
}