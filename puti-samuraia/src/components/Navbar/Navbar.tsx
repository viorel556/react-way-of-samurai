import React from "react";
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";

type NavDataType = {
    isActive: boolean
    isPending: boolean
    isTransitioning: boolean
}

const Navbar = () => {

    function conditionalActiveStyle(navData: NavDataType) {

        // FUNC TO CONDITIONALLY STYLE NAV ELEMENTS IF WE CLICK ON THEM;
       return navData.isActive ? classes.active : classes.item;
    }

    return ( 
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to='/profile' className={ conditionalActiveStyle }>
                    Profile
                </NavLink>
            </div>

            <div className={`${classes.item} ${classes.active}`}>
                <NavLink to='/dialogs' className={ conditionalActiveStyle }>
                    Messages
                </NavLink>
            </div>

            <div className={`${classes.item} ${classes.active}`}>
                <NavLink to='/users' className={ conditionalActiveStyle }>
                    Users
                </NavLink>
            </div>

            <div className={classes.item}>
                <NavLink to='/news' className={ conditionalActiveStyle }>
                    News
                </NavLink>
            </div>

            <div className={classes.item}>
                <NavLink to='/music' className={ conditionalActiveStyle }>
                    Music
                </NavLink>
            </div>

            <div className={classes.item}>
                <NavLink to='/settings' className={ conditionalActiveStyle }>
                    Settings
                </NavLink>
            </div>
        </nav>
        
    );
}

export default Navbar;