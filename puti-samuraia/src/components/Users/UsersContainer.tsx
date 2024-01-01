import React from "react";
import {connect, MapDispatchToProps} from "react-redux";
import {
    follow, followUser,
    getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow, unfollowUser
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
     // FIXME[EASY]: setCurrentPage, toggleFollowingProgress
    // these seems to be redundant. Try to delete and test if anything breaks
    getUsers: (currentPage: number, pageSize: number) => void
    followUser: (userId: number) => void // +redundant
    unfollowUser: (userId: number) => void // +redundant
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

type OwnPropsType = { pageTitle: string }

// COMBINES: MapStateToPropsType, MapDispatchToPropsType, OwnPropsType
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

// CONTAINER COMPONENT 2:
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        // when the component is mounted we begin to request the user from the server;
        // we use here a thunkMiddleware to dispatch network requests and also other actions;
        // DESTRUCTURIZATION OF PROPS:
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

let mapDispatchToProps: MapDispatchToPropsType = (
    {
        // CALLBACKS:
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers,
        followUser,
        unfollowUser,
    }
);

export default compose<React.Component<PropsType>>(
    withAuthRedirect,
    // 􀄨
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps),
    // ()
    // 􀄨
)
(UsersContainer);