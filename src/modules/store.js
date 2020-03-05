import { createStore, applyMiddleware } from "redux"
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk"
import createRootReducer from "modules/reducers";


const history = createBrowserHistory();

let store;

export function configureStore(preloadedState) {
    const middleware = [
        thunkMiddleware,
        routerMiddleware(history),
    ].filter(Boolean);

    const initialState = {};
    store = createStore(createRootReducer(history), preloadedState, composeWithDevTools(applyMiddleware(...middleware)));
    return store;
}

export function getHistory() {
    return history;
}

export default function getStore() {
    return store;
}