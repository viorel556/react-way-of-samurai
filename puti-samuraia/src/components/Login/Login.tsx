import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css";
import LoginReduxForm from "./LoginForm";
import {AuthDetailsType} from "../../types/types.ts";
import {AuthCredentialsType} from "../../redux/auth-reducer.ts";
import LoginForm from "./LoginForm";

type PropsType = {
    // DOUBLE CODE
    auth: AuthDetailsType
    authorizeMe: () => void
    authorizeWithCredentials: (formData: AuthCredentialsType) => void
    captcha: string
}

// FOCUS:
const Login: FC<PropsType> = (props) => {

    const onSubmit = (formData: AuthCredentialsType) => {
        // here we call a THUNK
        props.authorizeWithCredentials(formData);
    }

    // IF logged in we're going to our Profile Page;
    if (props.auth.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div className={classes.loginContainer}>
            <h1> LOG IN </h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captcha={props.auth.captcha}
            />


        </div>
    );
}


export default Login;
