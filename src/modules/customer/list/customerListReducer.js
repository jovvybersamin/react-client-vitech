import actions from "modules/customer/list/customerListActions";
import defaults from "modules/customer/list/customerListDefaults";
import paginationReducer from "modules/shared/pagination/paginationReducer";

export default paginationReducer(actions, {
    sorter: {
        ...defaults.sorter
    }
});