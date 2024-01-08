import {APIResponseType, GetUsersResponseType} from "./api-types.ts";
import {instance} from "./api.ts";

export const usersApi = {

    async requestUsers(currentPage = 1, pageSize = 5) {
        // SERVER REQUEST TO GET A BUNCH OF USERS (for page rendering)
        const response =
            await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },

    requestFollowUser(userId: number) {
        // SERVER REQUEST TO FOLLOW AN USER
        return instance.post<APIResponseType>(`follow/${userId}`, {})
    },

    requestUnfollowUser(userId: number) {
        // SERVER REQUEST TO UNFOLLOW AN USER;
        return instance.delete<APIResponseType>(`follow/${userId}`)
    }

}