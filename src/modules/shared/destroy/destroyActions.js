import { getHistory } from 'modules/store';
import Errors from "modules/shared/error/error";
import Message from "views/shared/message";
import listSelectors from "modules/customer/list/customerListSelectors";


export default ({
    prefix,
    destroyAllFn,
    destroySuccessMessage,
    destroyAllSuccessMessage,
    redirectTo,
    listActions
}) => {
    const actions = {
        DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
        DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
        DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

        DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
        DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
        DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

        doDestroy: (id, resetList = false) => async (dispatch, getState) => {
            try {

                dispatch({
                    type: actions.DESTROY_STARTED,
                });

                await destroyAllFn([id]);

                dispatch({
                    type: actions.DESTROY_SUCCESS,
                });

                if (resetList) {
                    dispatch(listActions.doFetch(listSelectors.selectFilter(getState()), true));
                }

                Message.success(destroySuccessMessage);
                getHistory().push(redirectTo);

            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: actions.DESTROY_ERROR,
                });
            }
        },

        doDestroyAll: (ids) => async (dispatch) => {
            try {
                dispatch({
                    type: actions.DESTROY_ALL_STARTED,
                });

                await destroyAllFn(ids);

                dispatch({
                    type: actions.DESTROY_ALL_SUCCESS,
                });

                if (listActions) {
                    dispatch(listActions.doChangeSelected([]));
                }

                Message.success(destroyAllSuccessMessage);

                getHistory().push(redirectTo);
            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: actions.DESTROY_ALL_ERROR,
                });
            }
        }
    }

    return actions;
}