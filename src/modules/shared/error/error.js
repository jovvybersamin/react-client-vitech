import { getHistory } from 'modules/store';
import Message from "views/shared/message";

const DEFAULT_ERROR_MESSAGE = 'Oops, an error occured';

function selectErrorCode(error) {

    console.log('Select Error Code', error);

    if (error.response) {
        const status = error.response.status;
        return status;
    }
    return 500;
}

function selectErrorMessage(error) {
    const message = error.response.message;
    console.log(error.response);

    return DEFAULT_ERROR_MESSAGE;
}

export default class Errors {
    static handle(error) {

        if (process.env.NODE_ENV === 'test') {
            console.log('NODE_ENV', process.env.NODE_ENV);
            console.error('Error:', error);
        }

        if (selectErrorCode(error) === 403) {
            getHistory().push('/403');
            return;
        }

        if (selectErrorCode(error) === 400) {
            Message.error(selectErrorMessage(error));
            return;
        }

        getHistory().push('/500');
    }
}