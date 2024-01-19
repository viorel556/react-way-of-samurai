import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css";
import LoginReduxForm from "./LoginForm";
import {AppDispatchType, AuthDetailsType} from "../../types/types.ts";
import {AuthCredentialsType, authorizeWithCredentials} from "../../redux/auth-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {getCaptcha, getIsAuth} from "../../redux/selectors/other-selectors.ts";
import {useAppDispatch} from "../../redux/redux-store.ts";

type PropsType = {
    // DOUBLE CODE
    auth: AuthDetailsType
    authorizeMe: () => void
    authorizeWithCredentials: (formData: AuthCredentialsType) => void
    captcha: string
}

// FOCUS:
const Login: FC = () => {
    const dispatch = useAppDispatch() // | DISPATCH
    const captcha = useSelector(getCaptcha)   // | SELECTORS
    const isAuth = useSelector(getIsAuth)

    const onSubmit = (formData: AuthCredentialsType) => {
        dispatch(authorizeWithCredentials(formData)); // <- THUNK
    }

    // IF logged in we're going to our Profile Page;
    if (isAuth) { return <Navigate to={"/profile"}/> }

    return (
        <div className={classes.loginContainer}>
            <h1> LOG IN </h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captcha={captcha}
            />
        </div>
    );
}


export default Login;
