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
        menu: true,
        component: React.lazy(() => import('./customer/list/CustomerListPage')),
        permissionRequired: null,
        exact: true,
    },
    {
        path: '/customers/create',
        parent: '/customers',
        icon: 'right',
        label: 'Customers',
        menu: false,
        component: React.lazy(() => import('./customer/form/CustomerFormPage')),
        permissionRequired: null,
        exact: true,
    },
    {
        path: '/customers/:id/edit',
        parent: '/customers',
        icon: 'right',
        label: 'Customers',
        menu: false,
        component: React.lazy(() => import('./customer/form/CustomerFormPage')),
        permissionRequired: null,
        exact: true,
    }
]

const errorRoutes = [
    {
        path: '/403',
        component: React.lazy(() => import('views/shared/errors/Error403Page')),
    },
    {
        path: '/500',
        component: React.lazy(() => import('views/shared/errors/Error500Page')),
    },
    {
        path: '**',
        component: React.lazy(() => import('views/shared/errors/Error404Page')),
    },
];

export default {
    publicRoutes,
    privateRoutes,
    errorRoutes
}