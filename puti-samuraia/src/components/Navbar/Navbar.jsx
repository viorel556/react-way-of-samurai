import React from "react";
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";



const Navbar = () => {
    return ( 
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to='/profile' className={ navData => navData.isActive ? classes.active : classes.item }>
                    Profile
                </NavLink>
            </div>

            <div className={`${classes.item} ${classes.active}`} >
                <NavLink to='/dialogs' className={ navData => navData.isActive ? classes.active : classes.item }>
                    Messages
                </NavLink>
            </div>

            <div className={classes.item}>
                <NavLink to='/news' className={ navData => navData.isActive ? classes.active : classes.item }>
                    News
                </NavLink>
            </div>

            <div className={classes.item}>
                <NavLink to='/music' className={ navData => navData.isActive ? classes.active : classes.item }>
                    Music
                </NavLink>
            </div>

            <div className={classes.item}>
                <NavLink to='/settings' className={ navData => navData.isActive ? classes.active : classes.item }>
                    Settings
                </NavLink>
            </div>
        </nav>
        
    );
}

export default Navbar;
 

//// Example code 
// "classes" looks like this: 
// let classes = { 
//     'nav': japanese_shit,  
//     'item': japanese_shit 
// }