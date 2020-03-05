import actions from "modules/auth/authActions";

const initialData = {
    authToken: localStorage.getItem('token'),
    currentUser: null,
    loadingInit: true,
    loading: false,
    errorMessage: null
}


export default (state = initialData, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.AUTH_BEGIN:
            return {
                authToken: null,
                currentUser: null,
                loading: true,
                errorMessage: null
            }
        case actions.AUTH_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                authToken: payload,
                currentUser: null,
                loading: false,
                errorMessage: null
            }
        case actions.AUTH_LOGOUT:
            localStorage.removeItem('token');
            return {
                authToken: null,
                currentUser: null,
                loading: false,
                errorMessage: null
            }
        case actions.AUTH_FAILURE:
        case actions.AUTH_REFRESH_FAILURE:
            localStorage.removeItem('token');
            return {
                authToken: null,
                currentUser: null,
                loading: false,
                errorMessage: payload.errorMessage
            }
        case actions.AUTH_REFRESH_BEGIN:
            return {
                ...state,
                loading: true,
                currentUser: null,
            };
        case actions.AUTH_REFRESH_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: payload
            };
        default:
            return state
    }
}