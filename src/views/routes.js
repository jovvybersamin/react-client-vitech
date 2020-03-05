import React from "react";

// for testing
function delay(promise, time) {
    return promise.then(
        result => new Promise(resolve => setTimeout(() => resolve(result), time))
    );
}

const publicRoutes = [
    {
        path: '/auth/signin',
        component: React.lazy(() => delay(import('./auth/SigninPage'), 50))
    }
];

const privateRoutes = [
    {
        path: '/',
        icon: 'home',
        label: 'Home',
        menu: {
            exact: true,
        },
        component: React.lazy(() => import('./home/HomePage')),
        permissionRequired: null,
        exact: true,
    },
    {
        path: '/customers',
        icon: 'right',
        label: 'Customers',
        menu: {
            exact: true,
        },
        component: React.lazy(() => import('./customer/list/CustomerListPage')),
        permissionRequired: null,
        exact: true,
    },
]

export default {
    publicRoutes,
    privateRoutes
}