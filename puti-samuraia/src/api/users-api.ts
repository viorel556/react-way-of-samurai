import {APIResponseType, GetUsersResponseType} from "./api-types.ts";
import {instance} from "./api.ts";
import {FilterType} from "../redux/users-reducer.ts";

export const usersApi = {

    async requestUsers(currentPage = 1, pageSize = 10, filter: FilterType) {

        // SERVER REQUEST TO GET A BUNCH OF USERS (for page rendering)
        const termFilter = `&term=${filter.term}`;
        const friendFilter = filter.friend === null ? "" : `&friend=${filter.friend}`;

        const response =
            await instance.get<GetUsersResponseType>
            (`users?page=${currentPage}&count=${pageSize}` + termFilter + friendFilter);

        return response.data;
    },

    async requestFollowUser(userId: number) {
        const response =
            await instance.post<APIResponseType>(`follow/${userId}`, {})

        return response.data; // in "data" we have the response code;
    },

    async requestUnfollowUser(userId: number) {
        const response =
            await instance.delete<APIResponseType>(`follow/${userId}`)

        return response.data;
    }
}