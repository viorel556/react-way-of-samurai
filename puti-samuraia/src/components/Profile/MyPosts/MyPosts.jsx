import React, { PureComponent } from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


const AddNewPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name='newPostText'
                       validate={[required, maxLengthCreator(10)]}
                       placeholder="Enter your post"
                />
            </div>

            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts = React.memo(props => {

        // mapping data
        let myPosts = props.posts.map(pst => <Post key={pst.id} message={pst.message} likes={pst.likesCount}/>)

        //let newPostElement = React.createRef();

        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        };

        return (
            <div className={classes.postsBlock}>

                <h3> My Posts </h3>

                <AddNewPostFormRedux onSubmit={onAddPost}/>

                <div className={classes.posts}>
                    {myPosts}
                </div>
            </div>
        );

});


export default MyPosts;