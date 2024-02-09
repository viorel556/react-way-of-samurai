
let initialState = {};

type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: any) => {
    // Sidebar doesn't have any shit so, I'm empty for now;
    return state;
}

export default sidebarReducer;