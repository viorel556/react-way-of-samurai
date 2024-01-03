import axios, {AxiosResponse} from "axios";
import {PhotosType, ProfileType, UserType} from "../types/types.ts";
import {
    CaptchaResponseType, EditProfileDataResponseType,
    FollowResponseType,
    GetUsersResponseType, GetUserStatusResponseType, LogInResponseType, LogOutResponseType,
    MeResponseType, SavePhotoResponseType,
    UnfollowResponseType, UpdateUserStatusResponseType,
    UserResponseType
} from "./ApiTypes.ts";


// DEFINING THE TYPES
type LoginFormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha?: string
}


const instance = axios.create(
    // making an Axios instance to reuse cookies & Api key;
    {
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        withCredentials: true,
        headers: {"Api-Key": "4ba4401d-9868-485d-aab6-1f9bb2406a03"}
    }
);

export const usersAPI = {

    requestUsers(currentPage = 1, pageSize = 5) {
        // SERVER REQUEST TO GET A BUNCH OF USERS (for page rendering)
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                    return response.data;
                }
            );
    },

    requestFollowUser(userId: number) {
        // SERVER REQUEST TO FOLLOW AN USER;
        return instance.post<FollowResponseType>(`follow/${userId}`, {});
    },

    requestUnfollowUser(userId: number) {
        // SERVER REQUEST TO UNFOLLOW AN USER;
        return instance.delete<UnfollowResponseType>(`follow/${userId}`);
    },

}

export const profileAPI = {
    // SERVER REQUEST FOR GETTING LOGGED IN USER DETAILS:
    authorizeMeRequest() {
        return instance.get<MeResponseType>('auth/me');
    },

    // SERVER REQUEST TO GET A SINGLE USER:
    requestUser(userId: number) {
        return instance.get<UserResponseType>(`profile/` + userId);
    },

    // SERVER REQUEST TO GET AN USER STATUS:
    requestUserStatus(userId: number) {
        return instance.get<GetUserStatusResponseType>(`/profile/status/` + userId);
    },

    // UPDATE STATUS FOR CURRENT AUTHORIZED USER:
    // the server expects an object with a status: ""
    requestUpdateUserStatus(status: string) {
        return instance.put<UpdateUserStatusResponseType>(`/profile/status/`,
            {status: status}
        );
    },

    requestAuthorizeWithCredentials(formData: LoginFormDataType) {

        return instance.post<LogInResponseType>('/auth/login/',
            {
                email: formData.login,
                password: formData.password,
                rememberMe: formData.rememberMe,
                captcha: formData.captcha //additionally
            }
        );
    },

    requestLogOut() {
        return instance.delete<LogOutResponseType>(`auth/login`);
    },

    requestCaptcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
    },

    requestSavePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<SavePhotoResponseType>('profile/photo', formData, {
            headers: {"Content-Type": "multipart/form-data"}
        });
    },

    requestSaveProfileData(formData: ProfileType) {
        return instance.put<EditProfileDataResponseType>(`profile`,
            formData
        );
    }

}




