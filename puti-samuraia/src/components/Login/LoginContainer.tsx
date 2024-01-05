import React from "react";
import Login from "./Login";
import {AuthCredentialsType, authorizeMe, authorizeWithCredentials, setCaptcha} from "../../redux/auth-reducer.ts";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store.ts";
import {AuthDetailsType} from "../../types/types.ts";

type MapStateToPropsType = {
    auth: AuthDetailsType
    captcha: string
}
type MapDispatchToPropsType = {
    authorizeMe: () => void
    authorizeWithCredentials: (formData: AuthCredentialsType) => void
}

type PropsType = {
    auth: AuthDetailsType
    authorizeMe: () => void
    authorizeWithCredentials: (formData: AuthCredentialsType) => void
    captcha: string
}

class LoginContainer extends React.Component<PropsType> {

    // [!] CAPTCHA WAS TESTED; IT IS SENT PROPERLY VIA PROPS!

    componentDidMount() {
        // I don't do shit after mounting!
    }

    render() {

        return (
            <Login {...this.props} authorizeMe={this.props.authorizeMe} />
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => (
    {
        auth: state.auth,
        captcha: state.auth.captcha
    }
)

let mapDispatchToProps: MapDispatchToPropsType = (
    {
        authorizeMe,
        authorizeWithCredentials,
    }
)

export default compose<React.Component<PropsType>>(
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);

