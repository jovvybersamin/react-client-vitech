import axios from "axios";
import utils from "modules/utils/Utils";

export default class CustomerService {
    static async list(filter, sorter, pagination) {
        utils.setAuthToken();
        const header = utils.jsonHeader();

        console.group('Customer Service');
        console.log('Fetching List.');

        console.log('Order by:', sorter);
        console.log('Pagination:', pagination);

        const response = await axios.get('/customers', {
            params: {
                ...sorter,
                ...filter,
                page: pagination.page,
                pageSize: pagination.pageSize
            }
        }, header);

        console.log(response);

        console.groupEnd();

        return response.data;
    }
}