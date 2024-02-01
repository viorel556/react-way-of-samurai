// WITH AUTH REDIRECT TSX:

import React, {ComponentType, FC} from "react";
import {Navigate} from 'react-router-dom'
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store.ts";

let mapStateToPropsForRedirect = (state: AppStateType) => (
    {   // USED ONLY FOR withAuthRedirect() HOC;
        isAuth: state.auth.isAuth
    }
)

type MapPropsType = { isAuth: boolean }
type MapDispatchType = { fake: () => void }
type PropsType = MapPropsType & MapDispatchType

// IMPORTANT SHIT:
// This HOC function creates 2 CONTAINERS:
// Container 1 is just to GET the isAuth value from the store;
// Container 2 is to REUSE the code bellow in 2 Components:
// "if (!this.props.isAuth) return <Navigate to={"/login"} />"

function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: FC<PropsType> = (props) => {
        // taking isAuth and leaving anything else in ...restProps;
        let {isAuth, fake, ...restProps} = props;

        if (!isAuth) return <Navigate to={"/login"}/>

        return <WrappedComponent {...restProps as WCP}/>

    }

    return connect<MapPropsType,
        MapDispatchType,
        WCP,
        AppStateType>(mapStateToPropsForRedirect, { fake: () => {} }
    )(RedirectComponent);
}

export default withAuthRedirect;

