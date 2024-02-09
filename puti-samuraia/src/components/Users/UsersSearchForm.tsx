import {Field, Form, Formik} from "formik";
import React, {FC, memo} from "react";
import {FilterType} from "../../redux/users-reducer.ts";
import {SearchFormType} from "../../types/types.ts";
import {searchBarFormTypeConvertor} from "../../utils/validators/FormikUtils.ts";
import classes from './users.module.css';

// TYPES:
type PropsType = { onFilterChanged: (filter: FilterType) => void; }
type SetSubmittingType = { setSubmitting: (isSubmitting: boolean) => void; }

function usersSearchFormValidate(values) { // VALIDATION LOGIC: (not set yet)
    const errors = {};
    return errors;
}

export const UsersSearchForm: FC<PropsType> = memo(({onFilterChanged}) => {
    // THE SEARCH BAR

    const submit = (values: SearchFormType, {setSubmitting}: SetSubmittingType) => {
        // [!]FORMIK: values-obj, has ALL values that we receive from form submission, even if its one field;
        // we receive string for "friend" but want boolean, hence a utility was created:

        // using a utility to convert form types to expected types:
        const filter: FilterType = searchBarFormTypeConvertor(values);

        onFilterChanged(filter);
        setSubmitting(false);
    }

    return <div className={classes.searchBarContainer}>
        <h1>Search an user</h1>
        <p> Try Searching "Viorel". I have an original name. I'm pretty sure I'm still the only Viorel on the platform
            :)) </p>

        <Formik
            initialValues={{term: '', friend: null}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >

            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>

                    <Field name="friend" as="select">
                        <option value="null">All Users</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>

                    <button type="submit"> Search</button>
                </Form>
            )}
        </Formik>
    </div>
});