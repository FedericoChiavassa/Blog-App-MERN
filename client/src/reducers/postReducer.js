import { GET_POSTS, GET_POST, ADD_POST, UPDATE_POST, DELETE_POST, POSTS_LOADING, CLEAR_POST_STATE } from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case UPDATE_POST:
            return {
                ...state,
                post: action.payload
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter( post => post._id !== action.payload)
            };
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_POST_STATE:
            return {
                ...state,
                post: {}
            };
        default:
            return state;
    }
}