import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css";
import LoginReduxForm from "./LoginForm";
import {AppDispatchType, AuthDetailsType} from "../../types/types.ts";
import {AuthCredentialsType, authorizeWithCredentials} from "../../redux/auth-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/redux-store.ts";
import {getCaptcha, getIsAuth} from "../../redux/selectors/selectors.ts";

type PropsType = {
    // DOUBLE CODE
    auth: AuthDetailsType
    authorizeMe: () => void
    authorizeWithCredentials: (formData: AuthCredentialsType) => void
    captcha: string
}

// FOCUS:
const Login: FC = () => {
      // FIXME[MEDIUM](***): This page is #UGLY! Migrate this form to Formik;
     // I want to make this migration just for the sake of styling;
    // Although the functional for Auth is gut, this is time-consuming;

    const dispatch = useAppDispatch() // | DISPATCH
    const captcha = useSelector(getCaptcha)    // | SELECTORS
    const isAuth = useSelector(getIsAuth)

    const onSubmit = (formData: AuthCredentialsType) => {
        dispatch(authorizeWithCredentials(formData)); // <- THUNK
    }

    // IF logged in we're going to our Profile Page;
    if (isAuth) { return <Navigate to={"/profile"}/> }

    return (
        <div className={classes.loginContainer}>
            <h1> LOG IN </h1>
            <p>You have to be logged in to access this content!
           If you don't have an account feel free to use: Email: free@samuraijs.com Password: free</p>
            <LoginReduxForm
                onSubmit={onSubmit}
                captcha={captcha}
            />
        </div>
    );
}


export default Login;
