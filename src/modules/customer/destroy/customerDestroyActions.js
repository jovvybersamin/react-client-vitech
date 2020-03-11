import actions from "modules/shared/destroy/destroyActions";
import CustomerService from "modules/customer/customerService";
import listActions from "modules/customer/list/customerListActions";

const prefix = "CUSTOMER_DESTROY";
export default actions({
    prefix,
    destroyAllFn: CustomerService.destroyAll,
    destroySuccessMessage: "Customer has been successfully deleted.",
    destroyAllSuccessMessage: "All selected customer/s has been successfully deleted.",
    redirectTo: '/customers',
    listActions
});