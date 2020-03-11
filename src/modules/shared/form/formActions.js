import { getHistory } from 'modules/store';
import Errors from "modules/shared/error/error";
import Message from "views/shared/message";


export default ({
    prefix,
    findFn,
    createFn,
    updateFn,
    destroyFn,
    redirectTo,
    createSuccessMessage,
    updateSuccessMessage,
    destroySuccessMessage
}) => {

    const actions = {
        RESET: `${prefix}_RESET`,

        FIND_STARTED: `${prefix}_FIND_STARTED`,
        FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
        FIND_ERROR: `${prefix}_FIND_ERROR`,

        CREATE_STARTED: `${prefix}_CREATE_STARTED`,
        CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
        CREATE_ERROR: `${prefix}_CREATE_ERROR`,

        UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
        UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
        UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

        doNew: () => {
            return {
                type: actions.RESET
            }
        },

        doFind: (id) => async (dispatch) => {
            try {

                dispatch({
                    type: actions.FIND_STARTED
                });

                const record = await findFn(id);

                dispatch({
                    type: actions.FIND_SUCCESS,
                    payload: record
                });

            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: actions.FIND_ERROR,
                });

                getHistory().push(redirectTo);
            }
        },

        doCreate: (values) => async (dispatch) => {
            try {
                dispatch({
                    type: actions.CREATE_STARTED
                });

                await createFn(values);

                dispatch({
                    type: actions.CREATE_SUCCESS
                });

                Message.success(createSuccessMessage);

                getHistory().push(redirectTo);
            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: actions.CREATE_ERROR,
                });
            }
        },

        doUpdate: (id, values) => async (dispatch) => {
            try {
                dispatch({
                    type: actions.UPDATE_STARTED
                });

                await updateFn(id, values);

                dispatch({
                    type: actions.UPDATE_SUCCESS
                });

                Message.success(updateSuccessMessage);
            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: actions.UPDATE_ERROR,
                });
            }
        }
    }

    return actions;
};