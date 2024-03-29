import { GET_POSTS, GET_POST, ADD_POST, UPDATE_POST, DELETE_POST, POSTS_LOADING, CLEAR_POST_STATE, GET_USER_POSTS, GET_POSTS_PER_PAGE } from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: 9999
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
        case GET_USER_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POSTS_PER_PAGE:
            return {
                ...state,
                posts: action.payload.docs,
                loading: false,
                hasPrevPage: action.payload.hasPrevPage,
                hasNextPage: action.payload.hasNextPage,
                totalPages: action.payload.totalPages
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map( post => post._id === action.payload._id ? action.payload : post)
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