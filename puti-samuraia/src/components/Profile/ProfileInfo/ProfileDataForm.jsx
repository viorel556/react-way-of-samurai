import React, {FC} from "react";
import classes from "./ProfileInfo.module.css";
import jobChecker from "../../../assets/images/jobCheck.png";
import {Contact} from "./ProfileInfo";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {ProfileType} from "../../../types/types.ts";

  // FIXME[HARD]: I FUCKING HATE THIS; MAJOR REFACTORING REQUIRED;
 // just put all this shit in settings and make separate functional (api & thunks) for each piece of data;
// at the end of the day nobody edits their profile BY SUBMITTING A FUCKING FORM really;



const ProfileDataForm = ({handleSubmit, profile, error}) => {

    return (
        <form onSubmit={handleSubmit}>

            <div> <button> SAVE </button> </div>
            {error && // UI HANDLING OF THE ERROR OF WRONG EMAIL/PASS
                <div className={classes.formSummaryError}>
                    {error}
                </div>
            }

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
                return <div key={key} className={classes.contactStyle}>
                    <b>{key}: {createField(key, 'contacts.'+key, [], Input)} </b>
                </div>
            })}
            </div>

        </form>
    );
}

export const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);