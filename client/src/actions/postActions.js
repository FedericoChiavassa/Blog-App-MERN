import axios from 'axios';
import { GET_POSTS, GET_POST, ADD_POST, UPDATE_POST, DELETE_POST, POSTS_LOADING, CLEAR_POST_STATE } from './types';

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))

};

export const deletePost = (id) => (dispatch) => {
    axios.delete(`/api/posts/${id}`)
    .then(res => dispatch({
        type: DELETE_POST,
        payload: id
    }))

};

export const addPost = (post) => (dispatch) => {
    axios.post('/api/posts', post)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
};

export const getPost = (id) => (dispatch) => {
    dispatch(setPostsLoading());
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
};

export const updatePost = (id, post) => (dispatch) => {
    axios.put(`/api/posts/${id}`, post)
        .then(res => dispatch({
            type: UPDATE_POST,
            payload: res.data
        }))
};

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING,
    };
};

export const clearPostState = () => {
    return {
        type: CLEAR_POST_STATE,
    };
};