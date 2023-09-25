const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState =
    {
        posts: [
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 1, message: "Hey how are you!?!", likesCount: 20},
            {id: 2, message: "This is my first post  ", likesCount: 10}
        ],
        newPostText: "it-kamasutra.com"
    }

const profileReducer = (state = initialState,
                        action) => {

    switch (action.type) {
        case ADD_POST: {
            // new post parameters
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };

            return { // THIS IS A STATE COPY;
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            }
        }

        case UPDATE_NEW_POST_TEXT: {

            return { /// THIS IS A FUCKING STATE COPY
                ...state,
                newPostText: action.newText
            }
        }

        default:
            return state;
    }
}

export const addPostActionCreator = () => (
    {type: ADD_POST}
);
export const updateNewPostTextActionCreator = (text) => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
);


export default profileReducer;
