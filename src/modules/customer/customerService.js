import axios from "axios";
import utils from "modules/utils/Utils";

export default class CustomerService {
    static async list(filter, sorter, pagination) {
        utils.setAuthToken();
        const header = utils.jsonHeader();

        const response = await axios.get('/customers', {
            params: {
                ...sorter,
                ...filter,
                page: pagination.page,
                pageSize: pagination.pageSize
            }
        }, header);


        return response.data;
    }

    static async find(id) {
        utils.setAuthToken();
        const header = utils.jsonHeader();
        const response = await axios.get(`/customers/${id}`, {}, header);

        return response.data.data;
    }

    static async create(values) {
        utils.setAuthToken();
        const header = utils.jsonHeader();
        const body = JSON.stringify(values);
        const response = await axios.post('/customers', body, header);
        return response;
    }

    static async update(id, values) {
        utils.setAuthToken();
        const header = utils.jsonHeader();
        const body = JSON.stringify({ ...values, _method: 'PUT' });
        const response = await axios.post(`/customers/${id}`, body, header);
        return response;
    }

    static async destroyAll(ids) {
        utils.setAuthToken();
        const header = utils.jsonHeader();
        const response = await axios.delete(`/customers`, {
            data: {
                ids: ids,
            },
            ...header
        });
        return response;
    }
}
