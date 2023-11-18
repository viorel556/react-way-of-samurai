
import React, {Suspense} from "react";
import Preloader from "../components/common/Preloader/Preloader";

export const withSuspense = (Component) => {
    // CREATES A SUSPENSE TAG AROUND A COMPONENT:
    return (props) => {
        // arrow func;
        return (
            <Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </Suspense>
        );
    }
}


