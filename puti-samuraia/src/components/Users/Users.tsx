import React, {FC, memo} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType} from "../../redux/users-reducer.ts";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}
const Users: FC<PropsType> = ({
                                       currentPage, totalUsersCount,
                                       onPageChanged, pageSize, users, followingInProgress,
                                       onFilterChanged, ...props
                                   }) => {
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
            />

            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     unfollowUser={props.unfollowUser}
                                     followUser={props.followUser}
                />)
            }
        </div>
    );
}


export default Users;