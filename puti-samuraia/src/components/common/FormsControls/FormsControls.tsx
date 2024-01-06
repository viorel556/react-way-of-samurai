import React, {FC} from "react";
import classes from './FormsControls.module.css';
import {Field} from "redux-form";
import {see} from "../../../utils/object-helpers.ts";
import {InputPropsType, TextAreaPropsType} from "../../../types/types.ts";
import {FieldValidatorType} from "../../../utils/validators/validators.ts";

// FORM CONTROL RELATED TYPES:
type FormControlPropsType = {
    // here are described the types of props for FormControl component:
    meta: {touched: boolean, error: string}
    children: React.ReactNode
}

const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error;

    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>

            <div>
                {children}
            </div>

            {hasError && <span>{error}</span>}
        </div>
    );
}

export const Textarea: FC<TextAreaPropsType> = (props) => {
    const {
        input,
        meta,
        ...restProps
    } = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}

export const Input: FC<InputPropsType> = (props) => {
    const {input, meta, ...restProps} = props;

    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}


  // [!] GENERIC CASE
 // When creating a field with createField()
// we define a LIMITED SET OF VALUES that parameter "name" may have;
// IF we don't declare that set, the default value is string (FormKeysType extends string)
export function createField<FormKeysType extends string> (placeholder: string | undefined,
                            name: FormKeysType,
                            validators: FieldValidatorType[],
                            component: React.Component | React.FC,
                            props= {},
                            text='') {
    // [!] createField - is not a React.Component by itself; It's a function that renders stuff;
    return (
        <div>
            <Field component={component}
                   name={name}
                   placeholder={placeholder}
                   validate={validators}
                   {...props}
            /> {text}
        </div>
    );
}