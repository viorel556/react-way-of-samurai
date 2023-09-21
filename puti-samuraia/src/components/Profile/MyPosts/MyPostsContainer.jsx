import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () => {


    return (
    
        <StoreContext.Consumer> 
            { 
            
                (store) => {

                let state = store.getState(); 
                
                let addPost = () => { // FIXATES the current value in textarea and adds a post;
                    store.dispatch( addPostActionCreator() );
                };
                let onPostChange = (text) => { // func LISTENS and UPDATES "newPostText" in BLL;
                    let action = updateNewPostTextActionCreator(text)
                    store.dispatch( updateNewPostTextActionCreator(text) );
                }

                return <MyPosts updateNewPostText={onPostChange}
                    addPost={ addPost }
                    posts={ state.profilePage.posts }
                    newPostText={ store.getState().profilePage.newPostText } />
                }
                   
            }
        </StoreContext.Consumer> 
              
    );
}


export default MyPostsContainer;
