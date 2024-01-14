import {APIResponseType, GetUsersResponseType} from "./api-types.ts";
import {instance} from "./api.ts";

export const usersApi = {

    async requestUsers(currentPage = 1, pageSize = 5) {
        // SERVER REQUEST TO GET A BUNCH OF USERS (for page rendering)
        const response =
            await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)

        return response.data
    },

    async requestFollowUser(userId: number) {
        const response =
            await instance.post<APIResponseType>(`follow/${userId}`, {})

        return response.data; // in "data" we have the response code;
    },

    async requestUnfollowUser(userId: number) {
        const response =
            await instance.delete<APIResponseType>(`follow/${userId}`)

        return response.data; // in "data" we have the response code;
    }
}