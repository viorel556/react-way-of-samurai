import './App.css';
import {Layout, Menu} from 'antd';
import Icon from '@ant-design/icons';
import React, {ComponentType, FC} from "react";
import {HashRouter, Link, Route, Routes} from "react-router-dom";
import {connect, Provider} from "react-redux";
import withRouter from "./hoc/withRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {IntroductionMessage} from "./components/IntroductionMessage/IntroductionMessage.tsx";
import Dialogs from "./components/Dialogs/Dialogs.tsx";
import News from "./components/News/News.tsx";
import Music from "./components/Music/Music.tsx";
import Settings from "./components/Settings/Settings.tsx";
import Login from "./components/Login/Login.tsx";
import {NotFoundPage} from "./components/common/NotFoundPage/NotFoundPage.tsx";
import {AuthButton} from "./components/AuthButton/AuthButton.tsx";
import {Footer} from "antd/lib/layout/layout";

const {Header, Sider, Content} = Layout;


// LAZY IMPORTS:
const ProfilePage = React.lazy(() => import("./components/Profile/ProfilePage.tsx"));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchToPropsType = { initializeApp: () => (dispatch: any) => void; };

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

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

    state = {collapsed: false}
    toggle = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    render() {

        if (!this.props.initialized) { return <Preloader/> }

        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        <Menu.Item key="1">
                            <Icon type={'profile'}/>
                            <Link to='/profile'>Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <Link to='/dialogs'>Messages</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <Link to='/users'>Users</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="news"/>
                            <Link to='/news'>News</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="music"/>
                            <Link to='/music'>Music</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="settings"/>
                            <Link to='/settings'>Settings</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{background: '#fff', padding: '5px', alignItems: 'right', display:'inline-flex', justifyContent:'flex-end'}}>
                        <AuthButton/>
                    </Header>

                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        <div className='app-wrapper-content'>
                            <Routes>
                                <Route path="/" element={<IntroductionMessage/>}/>
                                <Route path="/react-puti-samuraia" element={<IntroductionMessage/>}/>
                                <Route path="/dialogs/" element={<Dialogs/>}/>
                                <Route path="/profile/:userId?" element={<ProfilePage/>}/>
                                <Route path="/users" element={<UsersPage/>}/>
                                <Route path="/news" element={<News/>}/>
                                <Route path="/music" element={<Music/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path='*' element={<NotFoundPage/>}/>
                            </Routes>
                        </div>
                    </Content>
                    <Footer>  SAMURAI JS SOCIAL NETWORK 2024 (c) All Rights Reserved </Footer>
                </Layout>
            </Layout>
        );
    }
}

let mapStateToProps = (state: AppStateType) => (
    {
        initialized: state.app.initialized
    }
);
const mapDispatchToProps = ({initializeApp});

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
                <AppContainer/>
            </Provider>
        </HashRouter>
    );
}

export default SamuraiJSApp;