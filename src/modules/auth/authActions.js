import service from 'modules/auth/authService';

const prefix = 'AUTH';
const actions = {

    AUTH_BEGIN: `${prefix}_BEGIN`,
    AUTH_SUCCESS: `${prefix}_SUCCESS`,
    AUTH_FAILURE: `${prefix}_FAILURE`,
    AUTH_LOGOUT: `${prefix}_LOGOUT`,

    AUTH_REFRESH_BEGIN: `${prefix}_REFRESH_BEGIN`,
    AUTH_REFRESH_SUCCESS: `${prefix}_REFRESH_SUCCESS`,
    AUTH_REFRESH_FAILURE: `${prefix}_REFRESH_FAILURE`,



    doSigninWithEmailAndPassword: (email, password, rememberMe = false) => async (dispatch) => {
        try {
            dispatch({
                type: actions.AUTH_BEGIN
            });
            let currentUser = null;
            const { original } = await service.signinWithEmailAndPassword(email, password, rememberMe);
            dispatch({
                type: actions.AUTH_SUCCESS,
                payload: original.access_token
            });

        } catch (error) {

            dispatch({
                type: actions.AUTH_FAILURE,
                payload: {
                    errorMessage: "Sorry, we don't recognize your crendetials"
                }
            });


            console.log('Login Error:', error.response);
        }
    },

    doSignout: () => async (dispatch) => {
        try {

            dispatch({
                type: actions.AUTH_BEGIN
            });

            await service.signout();

            dispatch({
                type: actions.AUTH_LOGOUT
            });

        } catch (error) {
            dispatch({
                type: actions.AUTH_FAILURE
            });
        }
    },

    doRefreshCurrentUser: () => async (dispatch) => {

        dispatch({
            type: actions.AUTH_REFRESH_BEGIN
        });

        try {
            const currentUser = await service.fetchMe();
            dispatch({
                type: actions.AUTH_REFRESH_SUCCESS,
                payload: currentUser
            });
        } catch (error) {
            dispatch({
                type: actions.AUTH_REFRESH_FAILURE,
                payload: {
                    errorMessage: null
                }
            });
        }
    }
}

export default actions;