import React from "react";
import Login from "./Login";
import {authorizeMe, authorizeWithCredentials, setCaptcha} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

class LoginContainer extends React.Component {

    componentDidMount() {
        // I don't do shit after mounting!
    }

    render() {
        return (
          <Login {...this.props}
                 authorizeMe={this.props.authorizeMe}
          />
        );
    }
}

let mapStateToProps = (state) => (
    {
        auth: state.auth,
        captcha: state.captcha
    }
)

let mapDispatchToProps = (
    {
        authorizeMe,
        authorizeWithCredentials,
    }
)

export default compose (
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);

