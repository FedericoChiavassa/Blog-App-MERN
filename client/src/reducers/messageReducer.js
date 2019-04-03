import { CREATE_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {
    msg: ""
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_MESSAGE:
            return {
                ...state,
                msg: action.payload
            }
        case CLEAR_MESSAGE:
            return {
                msg: ""
            }
        default:
            return state;
    }
}