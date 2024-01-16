import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {FilterType, followUser, getUsers, ThunkType, unfollowUser} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getAllUsers,
    getCurrentPage, getUsersFilter,
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
    filter: FilterType
}

type MapDispatchToPropsType = {
    getUsers: (page: number, pageSize: number, filter?: FilterType) => ThunkType
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void

}

// COMBINES: MapStateToPropsType, MapDispatchToPropsType, OwnPropsType
type PropsType = MapStateToPropsType & MapDispatchToPropsType

// CONTAINER COMPONENT 2:
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        // when the component is mounted we begin to request the user from the server;
        // we use here a thunkMiddleware to dispatch network requests and also other actions;
        // DESTRUCTURIZATION OF PROPS:
        let {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize, filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        debugger;
        const { pageSize  } = this.props;
        this.props.getUsers(1, pageSize, filter); // hard codding the current page to 1; (first results)
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
                   onFilterChanged={this.onFilterChanged}
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
        filter: getUsersFilter(state)
    }
}

let mapDispatchToProps: MapDispatchToPropsType = (
    {
        // CALLBACKS:
        getUsers,
        followUser,
        unfollowUser,
    }
);

export default compose<ComponentType>(
    withAuthRedirect,
    // 􀄨
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps),
    // ()
    // 􀄨
)
(UsersContainer);