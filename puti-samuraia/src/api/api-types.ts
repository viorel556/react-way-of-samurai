import {PhotosType, ProfileType, UserType} from "../types/types.ts";
import {ResultCodeEnum} from "./api.ts";

 // CREATING A REUSABLE GENERIC:
// using that generic since for most of API requests, the server returns this:
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

// DATA TYPES:
export type MeResponseDataType = {
    // we define only the data type:
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = { userId: number }
type SavePhotoDataType = { photos: PhotosType }

// BASED on the generic ResponseType we create other response types:
export type MeResponseType = APIResponseType<MeResponseDataType>
export type LogInResponseType = APIResponseType<LoginResponseDataType>
export type SavePhotoResponseType = APIResponseType<SavePhotoDataType>

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type CaptchaResponseType = { url: string }