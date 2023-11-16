import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
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