import {PhotosType, ProfileType, UserType} from "../types/types.ts";

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaRequired = 10
}

export type MeResponseType = {
    resultCode: ResultCodeEnum
    data: {
        id: number,
        email: string,
        login: string
    }
    messages: Array<string>
}

export type LogInResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: { userId: number }
}

export type UserResponseType = ProfileType

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type FollowResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export type UnfollowResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export type GetUserStatusResponseType = string // the server really returns just a string as payload

export type UpdateUserStatusResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<String>
    data: {}
}

export type LogOutResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<String>
    data: {}
}

export type CaptchaResponseType = {
    url: string
}

export type SavePhotoResponseType = {
    // NOT SURE: if this is properly typed;
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {  photos: PhotosType }
}

export type EditProfileDataResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}