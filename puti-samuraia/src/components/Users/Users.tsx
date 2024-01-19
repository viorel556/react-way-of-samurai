import React, {FC, useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {AppDispatch} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType, followUser, getUsers, unfollowUser} from "../../redux/users-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter
} from "../../redux/users-selectors.ts";


export const Users: FC = () => {
    // DISPATCH:
    const dispatch: AppDispatch = useDispatch();

    // SELECTORS:
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getAllUsers)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    // CALLBACKS:
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
        // we might need dispatch() here, not sure;
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
        // hard codding the current page to 1; (first results)
    }
    const follow = (userId: number) => {
        dispatch(followUser(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId));
    }

    // COMPONENT DID MOUNT:
    useEffect( () => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);

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
                                     unfollowUser={unfollow}
                                     followUser={follow}
                />)
            }
        </div>
    );
}