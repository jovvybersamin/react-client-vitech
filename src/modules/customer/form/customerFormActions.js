import CustomerService from 'modules/customer/customerService';
import formActions from 'modules/shared/form/formActions';

const prefix = 'CUSTOMER_FORM';

export default formActions({
    prefix,
    createFn: CustomerService.create,
    createSuccessMessage: 'Customer successfully saved',
    updateFn: CustomerService.update,
    updateSuccessMessage: 'Customer successfully updated',
    findFn: CustomerService.find,
    redirectTo: '/customers',
});
