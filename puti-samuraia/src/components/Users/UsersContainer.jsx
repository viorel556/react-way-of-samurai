import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, loadUsersAC, unfollowAC} from "../../redux/users-reducer";


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        loadUsers: (users) => {
            dispatch(loadUsersAC(users))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);


