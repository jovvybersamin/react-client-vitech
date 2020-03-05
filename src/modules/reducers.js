import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import auth from "modules/auth/authReducer";
import layout from "modules/layout/layoutReducer";
import customer from "modules/customer/customerReducer";


export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    layout,
    customer
});