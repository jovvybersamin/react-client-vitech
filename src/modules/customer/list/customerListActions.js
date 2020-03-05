import CustomerService from "modules/customer/customerService";
import paginationAction from "modules/shared/pagination/paginationAction";
import selectors from "modules/customer/list/customerListSelectors";
import defaults from "modules/customer/list/customerListDefaults";


const prefix = 'CUSTOMER_LIST';

export default paginationAction(
    prefix,
    CustomerService.list,
    selectors,
    defaults
)