import {
    APIResponseType,
    CaptchaResponseType,
    LogInResponseType,
    MeResponseType,
    SavePhotoResponseType
} from "./api-types.ts";
import {ProfileType} from "../types/types.ts";
import {instance} from "./api.ts";
import {LoginFormDataType} from "../types/types.ts";


export const profileApi = {
    // SERVER REQUEST FOR GETTING LOGGED IN USER DETAILS:
    authorizeMeRequest() {
        return instance.get<MeResponseType>('auth/me');
    },

    // SERVER REQUEST TO GET A SINGLE USER:
    requestUser(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId);
    },

    // SERVER REQUEST TO GET AN USER STATUS:
    requestUserStatus(userId: number) {
        return instance.get<string>(`/profile/status/` + userId);
        // [!] the server really returns just a string as payload
    },

    // UPDATE STATUS FOR CURRENT AUTHORIZED USER:
    // the server expects an object with a status: ""
    requestUpdateUserStatus(status: string) {
        return instance.put<APIResponseType>(`/profile/status/`,
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
        return instance.delete<APIResponseType>(`auth/login`);
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
        return instance.put<APIResponseType>(`profile`,
            formData
        );
    }

}