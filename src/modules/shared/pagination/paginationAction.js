import _ from "lodash"
import Errors from "modules/shared/error/error";

export default (
    prefix,
    fetchFn,
    selectors,
    defaults
) => {
    const actions = {
        FETCH_BEGIN: `${prefix}_FETCH_BEGIN`,
        FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
        FETCH_FAILURE: `${prefix}_FETCH_FAILURE`,

        RESETED: `${prefix}_FETCH_RESETED`,
        SELECTEDS_CHANGED: `${prefix}_SELECTEDS_CHANGED`,

        PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

        SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,


        doChangeSelected(payload) {
            return {
                type: actions.SELECTEDS_CHANGED,
                payload,
            };
        },

        doReset: () => async (dispatch) => {
            dispatch({
                type: actions.RESETED,
            });

            dispatch(actions.doFetch());
        },

        doChangePaginationAndSort: (pagination, sorter) => async (dispatch, getState) => {
            dispatch({
                type: actions.PAGINATION_CHANGED,
                payload: {
                    page: pagination.current,
                    pageSize: pagination.pageSize,
                },
            });


            if (_.isEmpty(sorter)) {
                sorter.field = sorter.sortField;
                sorter.order = sorter.sortOrder;
            }

            dispatch({
                type: actions.SORTER_CHANGED,
                payload: {
                    sortField: sorter.field,
                    sortOrder: sorter.order
                },
            });

            const filter = selectors.selectFilter(getState());

            dispatch(actions.doFetch(filter, true));
        },


        doFetch: (filter, keepPagination = false) => async (dispatch, getState) => {
            try {

                dispatch({
                    type: actions.FETCH_BEGIN,
                    payload: { filter, keepPagination }
                });

                const response = await fetchFn(
                    filter,
                    selectors.selectSorter(getState()),
                    selectors.selectPagination(getState()),
                )

                console.log(`${prefix}_doFetch`, response);

                dispatch({
                    type: actions.FETCH_SUCCESS,
                    payload: {
                        rows: response.data,
                        count: response.meta.total
                    }
                });


            } catch (error) {

                Errors.handle(error);

                dispatch({
                    type: actions.FETCH_FAILURE
                });


            }
        }
    }

    return actions;
}