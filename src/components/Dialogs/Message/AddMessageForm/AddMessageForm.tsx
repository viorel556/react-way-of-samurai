import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React, {FC} from "react";
import {LoginFormValueType} from "../../../Login/LoginForm.tsx";


const AddMessageForm: FC<InjectedFormProps> = (props) => { // THE FORM
    // THE TYPE IS INJECTED FORM PROPS: the props are injected from redux-form library;
    return (
        <form onSubmit={props.handleSubmit}>
            <div>

                <Field component={Textarea}
                       validate={[required, maxLengthCreator(200)]}
                       name="newMessageBody"
                       placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}
const AddMessageReduxForm = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

export default AddMessageReduxForm;