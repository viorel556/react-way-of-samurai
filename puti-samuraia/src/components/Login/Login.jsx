import React from "react";
import {Field, reduxForm} from "redux-form";

const LoginForm = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"input"} name={'login'} placeholder={"Login"}/>
            </div>
            <div>
                <Field component={"input"} name={'password'} placeholder={"Password"}/>
            </div>
            <div>
                <Field component={"input"}
                       type={"checkbox"}
                       name={'rememberMe'}
                /> remember be
            </div>
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
        console.log(formData);
    }

    return (
        <div>
            <h1> This is login Page </h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;
