import React from "react";
import {Field, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import classes from "../common/FormsControls/FormsControls.module.css";


const LoginForm = ({handleSubmit, error}) => {

    return (

        <form onSubmit={handleSubmit}>


            {   // LOGIN FIELD
                createField('email', 'login', [required], Input)

            }

            {   // PASSWORD FIELD
                createField('password',
                    'password',
                    [required],
                    Input,
                    {type:'password'}
                )
            }

            {   // CHECKBOX FIELD
                createField(null,
                    'rememberMe',
                    null, Input,
                    {type:'checkbox'},
                    'Remember Me!'
                )
            }


            {error && // UI HANDLING OF THE ERROR OF WRONG EMAIL/PASS
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
// 􀄩
const LoginReduxForm = reduxForm({form: "login"})(LoginForm);
// something similar to connect & mapStateToProps & mapDispatchToProps;
// EVERY form needs a unique identifier, in our case is "login";
// now we have the LoginForm in a container (from HOC) that will take care of the functional;

// FOCUS:
const Login = (props) => {


    const onSubmit = (formData) => {
        // here we call a THUNK
        props.authorizeWithCredentials(formData);
    }

    if (props.auth.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>
            <h1> LOG IN </h1>
            <LoginReduxForm onSubmit={onSubmit}/>

            <img src={props.auth.captcha}/>

        </div>


    );
}

export default Login;
