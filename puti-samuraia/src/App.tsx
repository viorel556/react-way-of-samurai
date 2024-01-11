import './App.css';
import React, {Component, ComponentType, FC} from "react";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {HashRouter, Route, RouteProps} from "react-router-dom";
import {Routes} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from "react-redux";
import withRouter from "./hoc/withRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {IntroductionMessage} from "./components/IntroductionMessage/IntroductionMessage";
// LAZY IMPORTS:
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchToPropsType = { initializeApp: () => (dispatch: any) => void; } ;


class App extends Component<MapStateToPropsType & MapDispatchToPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('SOME ERROR OCCURRED');
    }

    componentDidMount() {
        this.props.initializeApp(); // calling the init of the app;
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() { // ending the event listener. UNSUBSCRIBING:
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {

        if (!this.props.initialized) { return <Preloader/> }

        return (
            <div className='app-wrapper'>

                <HeaderContainer />
                <Navbar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route exact path="/" element={<IntroductionMessage/>} />
                        <Route exact path="/react-puti-samuraia" element={<IntroductionMessage/>}/>
                        <Route path="/dialogs/" element={<DialogsContainer/>}/>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/users" element={<UsersContainer pageTitle={"Samurai"}/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<LoginContainer/>}/>
                        <Route path='*' element={ () => <div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => (
    {
        initialized: state.app.initialized
    }
);
const mapDispatchToProps = (
    {
        initializeApp
    }
);

let AppContainer = compose<ComponentType>(
    withRouter,
    withSuspense,
    connect(mapStateToProps, mapDispatchToProps)
    // returns a React component type
)(App);

const SamuraiJSApp: FC = () => {

    return (
        <HashRouter>

            {/*basename={process.env.PUBLIC_URL}*/}

            <Provider store={store}>

                <AppContainer />

            </Provider>

        </HashRouter>
    );
}

export default SamuraiJSApp;



