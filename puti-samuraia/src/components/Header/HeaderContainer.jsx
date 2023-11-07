import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import { logOut } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {

    }

    render()  {
        return <Header {...this.props  } />
    }
}

let mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
);
const mapDispatchToProps = (
    {
        logOut
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);