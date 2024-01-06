import classes from "../common/FormsControls/FormsControls.module.css";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import { InjectedFormProps, reduxForm, SubmitHandler} from "redux-form";
import React, {FC} from "react";

type PropsType = {
    // [!] THIS CODE IS REPEATED  x1:
    handleSubmit?: (() => void) & SubmitHandler
    captcha: string | null
    error?: string
}

export interface LoginFormValueType {
     // Here we store only those values that we can assign as names to createField()
    // we can't assign to "name" anything other than that!
    captcha: string
    rememberMe: boolean
    password: string
    login: string
}
  // [!] GENERIC VALUE:
 // When creating a field with createField()
// we define a LIMITED SET OF VALUES that parameter "name" may have;
// IF we don't declare that set, the default value is string (FormKeysType extends string)
type LoginFormValueTypeKeys = keyof LoginFormValueType
// IF^ bugs out, try: Extract<keyof LoginFormValueType, string> <- TAKES ONLY THE KEYS THAT ARE STRINGS AND IGNORES THE OTHER TYPES:

const LoginForm: FC<InjectedFormProps & PropsType>  =
    ({handleSubmit, error, captcha}) => {

    return (

        <form className={classes.formContainer} onSubmit={handleSubmit}>

            {   // LOGIN FIELD
                createField<LoginFormValueTypeKeys>('email', 'login', [required], Input)
            }

            {   // PASSWORD FIELD
                createField<LoginFormValueTypeKeys>('password', 'password', [required], Input, {type: 'password'},)
            }

            <div className={classes.checkBox}>
                {   // CHECKBOX FIELD
                    createField<LoginFormValueTypeKeys>(null, 'rememberMe', null, Input,
                        {type: 'checkbox'}, 'Remember Me!')
                }
            </div>

            <div>
                {   // CAPTCHA FIELD (if captcha exists)
                    // a) we render the image;
                    // b) we create a field to enter captcha data
                    captcha && <div>
                        <img src={captcha} alt="Captcha Image"/>
                        {
                            createField<LoginFormValueTypeKeys>('captcha',
                                'captcha',
                                [required], Input,
                                'Enter captcha!'
                            )
                        }
                    </div>
                }
            </div>


            { error && // UI HANDLING OF THE ERROR OF WRONG EMAIL/PASS
                <div className={classes.formSummaryError}>
                    {error}
                </div>
            }

            <div>
                <button>LOGIN</button>
            </div>
        </form>
    );
}

// |
// INTO A HIGH ORDER COMPONENT:
// 􀄩
// REDUX FORM HAS THE TYPE: <{}, PropsType>
const LoginReduxForm = reduxForm<{}, PropsType>({form: "login"})(LoginForm);
export default LoginReduxForm;
