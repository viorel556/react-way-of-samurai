import classes from "../common/FormsControls/FormsControls.module.css";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {DecoratedComponentClass, InjectedFormProps, reduxForm, SubmitHandler} from "redux-form";
import React, {FC} from "react";
import {AuthDetailsType} from "../../types/types.ts";
import {AuthCredentialsType} from "../../redux/auth-reducer.ts";

type PropsType = {
    // [!] THIS CODE IS REPEATED  x1:
    handleSubmit?: (() => void) & SubmitHandler<{}, {}, string>
    captcha: string | null
    error?: string
}

const LoginForm: FC<PropsType & InjectedFormProps>  =
    ({handleSubmit, error, captcha}) => {

    // the correct props destructurization:// {handleSubmit, error, captcha}

    return (

        <form className={classes.formContainer} onSubmit={handleSubmit}>

            {   // LOGIN FIELD
                createField('email', 'login', [required], Input)
            }

            {   // PASSWORD FIELD
                createField('password', 'password', [required], Input, {type: 'password'},)
            }

            <div className={classes.checkBox}>
                {   // CHECKBOX FIELD
                    createField(null, 'rememberMe', null, Input,
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
                            createField('captcha',
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
const LoginReduxForm = reduxForm<{}, PropsType>({form: "login"})(LoginForm);
export default LoginReduxForm;
