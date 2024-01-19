import React, {FC} from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth, getLoginData} from "../../redux/selectors/other-selectors.ts";
import {logOut} from "../../redux/auth-reducer.ts";
import {useAppDispatch} from "../../redux/redux-store.ts";


export const Header: FC = () => {
    const dispatch = useAppDispatch();

    // SELECTORS:
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLoginData)

    const handleOnClick = () => {
        dispatch(logOut());
    }

    return (
        <header className={classes.header}>
            <img
                src='https://png.pngtree.com/template/20200426/ourmid/pngtree-initial-letter-hg-logotype-company-name-design-image_366311.jpg'/>
            <div className={classes.loginBlock}>
                {isAuth
                    ? <div> {login} <button onClick={handleOnClick}>LOG OUT</button> </div>
                    : <NavLink to={'/login'}> LOGIN </NavLink>
                }
            </div>
        </header>
    );
};