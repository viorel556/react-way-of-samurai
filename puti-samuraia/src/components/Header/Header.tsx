import React, {FC} from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "../../types/types.ts";

const Header: FC<HeaderPropsType> = (props) => {

    return (
        <header className={classes.header}>
            <img src='https://png.pngtree.com/template/20200426/ourmid/pngtree-initial-letter-hg-logotype-company-name-design-image_366311.jpg'/>
            <div className={classes.loginBlock  }>
                { props.isAuth
                    ? <div> {props.login}  <button onClick={props.logOut}>LOG OUT</button> </div>
                    : <NavLink to={'/login'}> LOGIN </NavLink>
                }

            </div>
        </header>
    );
};

export default Header;