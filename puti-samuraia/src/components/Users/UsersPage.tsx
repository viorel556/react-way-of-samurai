import React, {FC} from "react";
import {useSelector} from "react-redux";
import {Users} from "./Users";
import Preloader from "../common/Preloader/Preloader";

import {getIsFetching} from "../../redux/selectors/selectors.ts";


const UsersPage: FC = () => {
    // THIS CONTAINER DID HAVE: withAuthRedirect();

    const isFetching = useSelector(getIsFetching);

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}

export default UsersPage;

