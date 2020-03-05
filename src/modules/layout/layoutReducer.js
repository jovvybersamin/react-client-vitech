import actions from 'modules/layout/layoutActions';

const initialData = {
    menuVisible: true,
    loading: false,
};

export default (state = initialData, { type, payload }) => {
    if (type === actions.MENU_TOGGLE) {
        return {
            ...state,
            menuVisible: !state.menuVisible,
        };
    }

    if (type === actions.MENU_SHOW) {
        return {
            ...state,
            menuVisible: true,
        };
    }

    if (type === actions.MENU_HIDE) {
        return {
            ...state,
            menuVisible: false,
        };
    }

    return state;
};
