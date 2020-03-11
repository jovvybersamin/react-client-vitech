const INITIAL_PAGE_SIZE = 10;

// Reusable Reducer for listing/pagination.

export default (
    actions,
    additionalInitialData = {}
) => {
    const initialData = {
        rows: [],
        count: 0,
        loading: false,
        filter: {},
        pagination: {
            page: 1,
            pageSize: INITIAL_PAGE_SIZE,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        },
        sorter: {},
        selectedKeys: [],
        ...additionalInitialData,
    };

    return (state = initialData, { type, payload }) => {

        switch (type) {

            case actions.SELECTEDS_CHANGED: {
                return {
                    ...state,
                    selectedKeys: payload || [],
                };
            }

            case actions.RESETTED: {
                return {
                    ...initialData
                }
            }

            case actions.FETCH_BEGIN: {
                return {
                    ...state,
                    loading: true,
                    selectedKeys: [],
                    filter: payload ? payload.filter : [],
                    pagination: payload && payload.keepPagination ? state.pagination : {
                        page: 1,
                        pageSize: INITIAL_PAGE_SIZE,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                    }
                }
            }

            case actions.FETCH_SUCCESS: {
                return {
                    ...state,
                    loading: false,
                    rows: payload.rows,
                    count: payload.count
                };
            }

            case actions.FETCH_FAILURE: {
                return {
                    ...state,
                    loading: false,
                    rows: [],
                    count: 0
                };
            }

            case actions.PAGINATION_CHANGED: {
                return {
                    ...state,
                    pagination: {
                        ...payload
                    }
                }
            }
            case actions.SORTER_CHANGED: {
                return {
                    ...state,
                    sorter: {
                        ...payload
                    }
                }
            }

            default:
                return state;
        }

    }
}