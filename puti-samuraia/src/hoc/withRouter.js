import {useLocation, useNavigate, useParams} from "react-router-dom";
import React from "react";

function withRouter(Component) {
    // MAKING THIS FUNC MANUALLY
    // because the previous withRouter() is deprecated. (now v6);
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();


        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default withRouter;