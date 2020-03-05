import { createSelector } from 'reselect';
import _get from "lodash/get";

export default (rawPath, unlimited) => {
    const selectRaw = (state) => _get(state, rawPath);

    const selectLoading = createSelector(
        [selectRaw],
        (raw) => raw.loading
    );

    const selectRows = createSelector(
        [selectRaw],
        (raw) => raw.rows
    );

    const selectCount = createSelector(
        [selectRaw],
        (raw) => raw.count
    );

    const selectSorter = createSelector(
        [selectRaw],
        (raw) => raw.sorter
    )

    const selectFilter = createSelector(
        [selectRaw],
        (raw) => raw.filter
    );

    const selectPagination = createSelector(
        [selectRaw, selectCount],
        (raw, count) => {
            return {
                ...raw.pagination,
                total: count,
                showSizeChanger: true
            }
        }
    )



    return {
        selectLoading,
        selectRows,
        selectCount,
        selectSorter,
        selectFilter,
        selectPagination
    }
}