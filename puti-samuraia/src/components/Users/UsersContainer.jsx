import React from "react";
import {connect} from "react-redux";
import {
    follow,
    loadUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


// CONTAINER COMPONENT 2:
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        // server request to get initial users;
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.loadUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        // server request to display other users;
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
            this.props.toggleIsFetching(false);
            this.props.loadUsers(data.items);
        });
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


// CONTAINER COMPONENT 1 (communicates with the STORE)
export default connect(mapStateToProps,

    {
        follow,
        unfollow,
        loadUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching
    }

    )(UsersContainer);