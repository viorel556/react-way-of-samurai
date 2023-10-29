import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
let mapStateToPropsForRedirect = (state) => (
    {   // USED ONLY FOR withAuthRedirect() HOC;
        isAuth: state.auth.isAuth
    }
);

// IMPORTANT SHIT:
// This HOC function creates 2 CONTAINERS:
// Container 1 is just to GET the isAuth value from the store;
// Container 2 is to REUSE the code bellow in 2 Components:
// "if (!this.props.isAuth) return <Navigate to={"/login"} />"
const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {

        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"} />
            return <Component {...this.props }/>
        }

    }

    let ConnectedAuthRedirectComponent =
        connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;
