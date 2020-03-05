import React from "react";
import { Route, Redirect } from "react-router-dom";
import PermissionChecker from 'modules/auth/permissionChecker';

const PublicRoute = ({
    component: Component,
    currentUser,
    ...rest
}) => {



    return (
        <Route
            {...rest}
            render={props => {
                const permissionChecker = new PermissionChecker(currentUser);

                if (permissionChecker.isAuthenticated) {
                    return <Redirect to="/" />
                }

                return <Component {...props} />;
            }}
        />
    )
}

export default PublicRoute;