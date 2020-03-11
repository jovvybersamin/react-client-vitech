import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import routes from "views/routes";
import actions from "modules/auth/authActions";
import PublicRoute from 'views/shared/routes/PublicRoute';
import PrivateRoute from 'views/shared/routes/PrivateRoute';

const RoutesComponent = ({ token, currentUser, dispatch }) => {

    useEffect(() => {
        if (token !== null) {
            dispatch(actions.doRefreshCurrentUser());
        }
    }, [token, dispatch])

    return (
        <Switch>
            {routes.publicRoutes.map((route) => (
                <PublicRoute
                    key={route.path}
                    exact
                    path={route.path}
                    currentUser={currentUser}
                    component={route.component}
                />
            ))}

            {routes.privateRoutes.map((route) => (
                <PrivateRoute
                    key={route.path}
                    exact
                    path={route.path}
                    currentUser={currentUser}
                    component={route.component}
                />
            ))}

            {routes.errorRoutes.map((route) => (
                <Route
                    key={route.path}
                    exact
                    path={route.path}
                    currentUser={currentUser}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}

const mapStateToProps = ({ auth }) => ({
    token: auth.authToken,
    currentUser: auth.currentUser,
});

export default connect(mapStateToProps)(RoutesComponent);