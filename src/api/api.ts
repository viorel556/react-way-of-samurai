import axios from "axios";

export enum ResultCodeEnum {
    // HERE ARE THE MEANINGS OF THE STATUS CODES:
    Success = 0,
    Error = 1,
    CaptchaRequired = 10
}
export const instance = axios.create(
    // making an Axios instance to reuse cookies & Api key;
    {
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        withCredentials: true,
        headers: {"Api-Key": "4ba4401d-9868-485d-aab6-1f9bb2406a03"}
    }
);