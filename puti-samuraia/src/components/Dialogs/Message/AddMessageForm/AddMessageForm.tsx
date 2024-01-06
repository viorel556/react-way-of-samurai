import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React, {FC} from "react";
import {WrappedFieldInputProps, WrappedFieldProps} from "redux-form/lib/Field";
import {InputMetaType} from "../../../../types/types.ts";



const AddMessageForm: FC<InjectedFormProps> = (props) => { // THE FORM
    // THE TYPE IS INJECTED FORM PROPS: the props are injected from redux-form library;

    return (
        <form onSubmit={props.handleSubmit }>
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
const AddMessageReduxForm = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm);

export default AddMessageReduxForm;