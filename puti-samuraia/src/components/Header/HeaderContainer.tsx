import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import { logOut } from "../../redux/auth-reducer.ts";
import {AppStateType} from "../../redux/redux-store.ts";
import {HeaderPropsType} from "../../types/types.ts";


type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsType = {
    logOut: () => void
}


class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {}

    render()  {
        return <Header {...this.props  } />
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
)
const mapDispatchToProps: MapDispatchToPropsType = (
    {
        logOut
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);