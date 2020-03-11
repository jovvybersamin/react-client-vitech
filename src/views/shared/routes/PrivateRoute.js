import React from "react";
import { Route, Redirect } from "react-router-dom";
import PermissionChecker from 'modules/auth/permissionChecker';

const PrivateRoute = ({
    component: Component,
    currentUser,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                const permissionChecker = new PermissionChecker(currentUser);
                if (!permissionChecker.isAuthenticated) {
                    console.log('Redirect to /auth', props.location);
                    return <Redirect to={{
                        pathname: "/auth/signin",
                        state: { from: props.location }
                    }} />;
                }
                return <Component {...props} />;
            }}
        />
    )
}

export default PrivateRoute;