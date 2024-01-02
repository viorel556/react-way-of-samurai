import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React, {FC} from "react";

type PropsTypes = {
    handleSubmit: () => void
}
const AddNewPostForm: FC<InjectedFormProps<PropsTypes>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name='newPostText'
                       validate={[required, maxLengthCreator(25)]}
                       placeholder="Enter your post"
                />
            </div>

            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

// CONTAINER COMPONENT:
const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export default AddNewPostFormRedux;