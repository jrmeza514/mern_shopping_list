import {
    DARK_MODE_DISABLED,
    DARK_MODE_ENABLED
} from './types';

export const setDarkMode = (val: boolean) => (dispatch: Function) => {
    if (val) {
        dispatch({ type: DARK_MODE_ENABLED });
        localStorage.setItem("theme", "THEME_DARK");
    }
    else {
        dispatch({ type: DARK_MODE_DISABLED });
        localStorage.setItem("theme", "THEME_LIGHT");
    }
}