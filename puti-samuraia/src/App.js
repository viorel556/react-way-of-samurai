import './App.css';
import React, {Suspense} from "react";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from "react-redux";
import withRouter from "./hoc/withRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
// LAZY IMPORTS:
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp(); // calling the init
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
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

let mapStateToProps = (state) => (
    {
        initialized: state.app.initialized
    }
);
const mapDispatchToProps = (
    {
        initializeApp
    }
);

let AppContainer = compose(
    withRouter,
    withSuspense,
    connect(mapStateToProps, mapDispatchToProps))(App);

const SamuraiJSApp = (props) => {

    return (
        <BrowserRouter>

            <Provider store={store}>

                <AppContainer/>

            </Provider>

        </BrowserRouter>
    );
}

export default SamuraiJSApp;



