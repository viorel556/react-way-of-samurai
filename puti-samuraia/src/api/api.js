import axios from "axios";

const instance = axios.create(
    // making an Axios instance to reuse cookies & Api key;
    {
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        withCredentials: true,
        headers: {"Api-Key": "eb22c93c-4f75-43ef-9465-0df311624841"}
    }
);

export const usersAPI = {

    requestUsers(currentPage = 1, pageSize = 5) {
        // SERVER REQUEST TO GET A BUNCH OF USERS (for page rendering)
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                    return response.data;
                }
            );
    },

    requestFollowUser(userId) {
        // SERVER REQUEST TO FOLLOW AN USER;
        return instance.post(`follow/${userId}`, {});
    },

    requestUnfollowUser(userId) {
        // SERVER REQUEST TO UNFOLLOW AN USER;
        return instance.delete(`follow/${userId}`);
    },

}

export const profileAPI = {
    // SERVER REQUEST FOR AUTHORIZATION:
    authorizeMeRequest() {
        return instance.get('auth/me');
    },

    // SERVER REQUEST TO GET A SINGLE USER:
    requestUser(userId) {
        return instance.get(`profile/` + userId);
    },

    // SERVER REQUEST TO GET AN USER STATUS:
    requestUserStatus(userId) {
        return instance.get(`/profile/status/`+userId);
    },

    // UPDATE STATUS FOR CURRENT AUTHORIZED USER:
    // the server expects an object with a status: ""
    requestUpdateUserStatus(status) {
        return instance.put(`/profile/status/`,
            {
                status: status
            }
        );
    }

}





