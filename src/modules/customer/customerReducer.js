import { combineReducers } from 'redux';
import list from "modules/customer/list/customerListReducer";
import form from "modules/customer/form/customerFormReducer";
import destroy from "modules/customer/destroy/customerDestroyReducer";


export default combineReducers({
    list,
    form,
    destroy
});

