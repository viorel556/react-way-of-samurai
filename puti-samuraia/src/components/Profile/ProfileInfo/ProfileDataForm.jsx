import React from "react";
import classes from "./ProfileInfo.module.css";
import jobChecker from "../../../assets/images/jobCheck.png";
import {Contact} from "./ProfileInfo";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";


const ProfileDataForm = ({handleSubmit, profile}) => {


    return (
        <form onSubmit={handleSubmit}>

            <div> <button> SAVE </button> </div>

            <div>
                <b>Full name: </b>
                {
                    createField("Full Name", "fullName", [], Input)
                }
            </div>

            <div>
                <b>Looking for a job: </b>
                {
                    createField("", "lookingForAJob", [], Input, {type: "checkbox"})
                }
            </div>

            <div>
                <b>My professional skills: </b>
                {
                    createField("My professional skills", "lookingForAJobDescription", [], Textarea)
                }
            </div>

            <div>
                <b>About me: </b>
                {
                    createField("About me", "aboutMe", [], Textarea)
                }
            </div>

            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <div className={classes.contactStyle}>
                    <b>{key}: {createField(key, 'contacts.'+key, [], Input)} </b>
                </div>
            })}
            </div>

        </form>
    );
}

export const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);