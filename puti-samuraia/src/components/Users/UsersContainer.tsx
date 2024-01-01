import React from "react";
import {connect} from "react-redux";
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

type PropsType = {
    // VARIABLES:
    pageTitle: string
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    // ARRAYS:
    users: Array<UserType>
    followingInProgress: Array<number>
    // CALLBACKS
    getUsers: (currentPage: number, pageSize: number) => void
    followUser: () => void
    unfollowUser: () => void
}

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
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

let mapDispatchToProps = (
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

export default compose(
    withAuthRedirect,
    // 􀄨
    connect(mapStateToProps, mapDispatchToProps),
    // ()
    // 􀄨
)
(UsersContainer);