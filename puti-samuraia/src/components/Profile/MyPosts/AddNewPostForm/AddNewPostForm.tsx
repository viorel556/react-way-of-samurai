import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import classes from "../MyPosts.module.css"
import React, {FC} from "react";

type PropsType = {
    handleSubmit: () => void
}
const AddNewPostForm: FC<InjectedFormProps<PropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name='newPostText'
                       validate={[required, maxLengthCreator(25)]}
                       placeholder="Enter your post"
                       className={classes.reduxTextArea}
                />

                <button className={classes.addPostButton}>Add Post</button>
            </div>
        </form>
    );
}

// CONTAINER COMPONENT:
const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export default AddNewPostFormRedux;