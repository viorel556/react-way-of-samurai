import React, {FC, useEffect, useState} from "react";
import classes from "../ProfileInfo.module.css"

//<ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>

type PropsType = {
    status: string
    updateMyStatus: (status: string) => void
}


const ProfileStatusWithHooks: FC<PropsType>  = (props) => {
    // THIS IS A HOOK:
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status] );


    // FUNCTIONAL "editMode"
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateMyStatus(status);
    }

    // FUNCTIONAL "status"
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={classes.status}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>

                       <b>Status: </b> {props.status || "---------"}  </span>
                </div>
            }

            {editMode &&
                <div>
                    <input
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        // autoFocus={true}
                        value={status}
                    />
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;
