import './App.css';
import React, {Component, ComponentType, FC} from "react";
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {HashRouter, Route, Routes} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import {connect, Provider} from "react-redux";
import withRouter from "./hoc/withRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {IntroductionMessage} from "./components/IntroductionMessage/IntroductionMessage";
import {NotFoundPage} from "./components/common/NotFoundPage/NotFoundPage.tsx";
import Login from "./components/Login/Login.tsx";
import Dialogs from "./components/Dialogs/Dialogs.tsx";
import {Header} from "./components/Header/Header.tsx";
//import ProfilePage from "./components/Profile/ProfilePage.tsx";
// LAZY IMPORTS:
const ProfilePage = React.lazy(() => import("./components/Profile/ProfilePage.tsx"));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchToPropsType = { initializeApp: () => (dispatch: any) => void; };

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

                <Header />
                <Navbar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/" element={<IntroductionMessage/>} />
                        <Route path="/react-puti-samuraia" element={<IntroductionMessage/>}/>
                        <Route path="/dialogs/" element={<Dialogs />}/>
                        <Route path="/profile/:userId?" element={<ProfilePage />}/>
                        <Route path="/users" element={<UsersPage />}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path='*' element={ <NotFoundPage/> }/>
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
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    );
}

export default SamuraiJSApp;



