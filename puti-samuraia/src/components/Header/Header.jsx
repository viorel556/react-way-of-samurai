import React from "react"; 
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return (
        <header className={classes.header}>
            <img src='https://png.pngtree.com/template/20200426/ourmid/pngtree-initial-letter-hg-logotype-company-name-design-image_366311.jpg'/>
            <div className={classes.loginBlock  }>
                { props.isAuth ? props.login
                    : <NavLink to={'/login'}> LOGIN </NavLink>
                }

            </div>
        </header>
    );
};

export default Header;