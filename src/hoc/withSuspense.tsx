
import React, {ComponentType, Suspense} from "react";
import Preloader from "../components/common/Preloader/Preloader";

export function withSuspense<WCP> (WrappedComponent: ComponentType<WCP>)  {
    // CREATES A SUSPENSE TAG AROUND A COMPONENT:
    return (props: WCP) => {
        // arrow func;
        return (
            <Suspense fallback={<Preloader/>}>
                <WrappedComponent {...props}/>
            </Suspense>
        );
    }
}


