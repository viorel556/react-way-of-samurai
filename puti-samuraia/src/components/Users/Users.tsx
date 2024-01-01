import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    followUser: () => void
    unfollowUser: () => void
}
const Users: FC<PropsType> = ({
                   currentPage,
                   totalUsersCount,
                   onPageChanged,
                   pageSize,
                   users,
                   followingInProgress,
                   ...props
               }) => {

    return (
        <div>

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