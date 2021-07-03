import {
    DARK_MODE_DISABLED,
    DARK_MODE_ENABLED
} from './types';

export const setDarkMode = (val: boolean) => (dispatch: Function) => {
    if (val) dispatch({ type: DARK_MODE_ENABLED });
    else dispatch({ type: DARK_MODE_DISABLED });
}