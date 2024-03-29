import React, {FC} from "react";
import classes from './AuthButton.module.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {logOut} from "../../redux/auth-reducer.ts";
import {useAppDispatch} from "../../redux/redux-store.ts";
import {Avatar, Button} from "antd";
import {getIsAuth, getLoginData} from "../../redux/selectors/selectors.ts";


export const AuthButton: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // SELECTORS:
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLoginData)

    const handleNavigation = () => { return navigate('/login') }
    const handleLogOut = () => dispatch(logOut());

    return (
        <div className={classes.buttonBlock}>
            {isAuth
                ? <div> { login === 'viorel.harabaru@gmail.com'
                    ? <Avatar className={classes.avatarStyle} size={'large'}>VIOREL</Avatar>
                    : <Avatar className={classes.avatarStyle} size={'large'}>GUEST</Avatar>}
                    <Button onClick={handleLogOut} type={'primary'}>LOG OUT</Button></div>
                : <Button onClick={handleNavigation} type={'dashed'}>Login </Button>
            }
        </div>
    );
};