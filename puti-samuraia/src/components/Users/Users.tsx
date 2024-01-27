import React, {FC, useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {AppDispatchType} from "../../types/types";
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
} from "../../redux/selectors/users-selectors.ts";
import {createSearchParams, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import styles from "./users.module.css";

export const Users: FC = () => {

    const dispatch: AppDispatchType = useDispatch(); // DISPATCH
    const navigate = useNavigate();  // NAVIGATE HOOK

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

    // LOADING DATA:
    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);


    // URL PARAMS LOGIC:
    const useNavigateSearch = () => {
        // making a custom hook:
        const navigate = useNavigate();
        return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
    };
    const navigateSearch = useNavigateSearch();
    const location = useLocation();

    // EFFECT 1:
    useEffect(() => {
        // ^ Is triggered when the filter changes
        navigateSearch("/users", {
            page: `${currentPage}`,
            count: `${pageSize}`,
            term: `${filter.term}`,
            friend: `${filter.friend}`,
        });
    }, [filter, currentPage, pageSize]);

    // EFFECT 2:
    useEffect(() => {
        const query = new URLSearchParams(location.search);

        let actualPage = currentPage;
        let actualFilter = filter;

        const queryFriend = query.get("friend");
        const queryPage = query.get("page");
        const queryTerm = query.get("term");

        if (queryPage) actualPage = +queryPage;

        if (queryTerm) {
            actualFilter = {...actualFilter, term: queryTerm};
        }

        switch (queryFriend) {
            case "null":
                actualFilter = {...actualFilter, friend: null};
                break;

            case "true":
                actualFilter = {...actualFilter, friend: true};
                break;

            case "false":
                actualFilter = {...actualFilter, friend: false};
                break;

            default: break;
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, [location.search]);


    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
            />


            <div className={styles.usersContainer}>
                {
                    users.map(u => <User user={u}
                                         followingInProgress={followingInProgress}
                                         unfollowUser={unfollow}
                                         followUser={follow}
                    />)
                }
            </div>

        </div>
    );
}