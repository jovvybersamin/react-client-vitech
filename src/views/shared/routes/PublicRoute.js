import React from "react";
import { Route, Redirect } from "react-router-dom";
import PermissionChecker from 'modules/auth/permissionChecker';

const PublicRoute = ({
    component: Component,
    currentUser,
    ...rest
}) => {

    function getStateFrom(state) {
        if (state) {
            return state.from;
        }
        return null;
    }


    return (
        <Route
            {...rest}
            render={props => {
                const permissionChecker = new PermissionChecker(currentUser);

                if (permissionChecker.isAuthenticated) {
                    const { location } = props;

                    if (getStateFrom(location.state)) {
                        return <Redirect to={location.state.from} />
                    }

                    console.log(location);
                    return <Redirect to="/" />
                }

                return <Component {...props} />;
            }}
        />
    )
}

export default PublicRoute;