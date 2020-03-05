import axios from "axios";


export default class Utils {
    static setAuthToken() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    static setAxiosBaseUrl() {
        axios.defaults.baseURL = 'http://vitech2.test/api';
    }

    static jsonHeader() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
    }
}