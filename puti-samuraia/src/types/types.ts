import {AppStateType} from "../redux/redux-store.ts";
import React from "react";
import {FieldValidatorType} from "../utils/validators/validators.ts";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

 // GENERAL APP STATE TYPE:
// imported from Redux-Store
export type GetStateType = () => AppStateType

// USER RELATED TYPES:
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

// POST RELATED TYPE
export type PostType = {
    likes: number
    message: string
    key: number
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}

// LOGIN RELATED TYPES:
export type AuthDetailsType = {
    userId: number
    email: string
    login: string
    isAuth: boolean
    captcha: string
}

// TYPES RELATED TO TEXT AREAS:
export type TextAreaPropsType = {
    input: {
        name: string;
        value: string;
    }
    meta: {
        active: boolean
        asyncValidating: boolean
        autofilled: boolean
        dirty: boolean
        error: string
        form: string
        invalid: boolean
        pristine: boolean
        submitting: boolean
        submitFailed: boolean
        touched: boolean
        valid: boolean
        visited: boolean
    }
    placeholder: string;
};

// INPUT RELATED TYPES
export type InputMetaType = {
    // we might want to use here: WrappedFieldMetaProps
    active: boolean
    asyncValidating: boolean
    autofilled: boolean
    dirty: boolean
    form: string
    invalid: boolean
    pristine: boolean
    submitting: boolean
    submitFailed: boolean
    touched: boolean
    valid: boolean
    visited: boolean
    // error is related to FormControlType:
    error: string
}
export type InputPropsType = {
    input: {
        name: string
        value: string
    };
    meta: InputMetaType;
    placeholder: string
    type: string
    child: React.ReactNode
}

// TYPES RELATED TO HEADER:
export type HeaderPropsType = {
    isAuth: boolean
    logOut: () => void
    login: string
}

// TYPES RELATED TO MESSAGES:
export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
}
