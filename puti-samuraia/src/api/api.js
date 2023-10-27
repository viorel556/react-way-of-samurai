import axios from "axios";

const instance = axios.create(
    // making an Axios instance to reuse cookies & Api key;
    {
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        withCredentials: true,
        headers: { "Api-Key": "eb22c93c-4f75-43ef-9465-0df311624841" }
    }

);

export const usersAPI = {
    getUsers (currentPage = 1 , pageSize = 5) {
        // SERVER REQUEST TO GET A BUNCH OF USERS (for page rendering)
        return (
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
                {withCredentials: true}
            )
                .then(response => {
                    return response.data;
                })
        );
    }
}



export const getUser = (userId) => {
    // SERVER REQUEST TO GET A SINGLE USER:
    return instance.get(  `profile/`+userId);
}

export const followUser = (userId) => {
    // SERVER REQUEST TO FOLLOW AN USER;
    return instance.post(  `follow/${userId}`, {} );
}

export const unfollowUser = (userId) => {
    // SERVER REQUEST TO UNFOLLOW AN USER;
    return instance.delete(  `follow/${userId}`);

}




