
import { GET_ERRORS, CLEAR_ERRORS } from './types'

export const returnErrors = (msg: String, status: Number, id: any = null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
} 