import './App.css';
import React from "react";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import withRouter from "./hoc/withRouter";

import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp(); // calling the init
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>

                <HeaderContainer/>
                <Navbar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs*" element={<DialogsContainer/>}/>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<LoginContainer/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        initialized: state.app.initialized
    }
);
const mapDispatchToProps = (
    {
        initializeApp
    }
);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(App);

