import axios from "axios";
import utils from 'modules/utils/Utils';

export default class AuthService {

    static async signinWithEmailAndPassword(email, password, rememberMe = false) {
        utils.setAuthToken();
        const header = utils.jsonHeader();
        const body = JSON.stringify({ email, password });
        const response = await axios.post('/auth/login', body, header);

        return response.data;
    }

    static async signout() {
        utils.setAuthToken();
        await axios.post('/auth/logout');
    }

    static async fetchMe() {
        utils.setAuthToken();
        const response = await axios.get('/auth/me');
        return response.data;
    }

}