import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPost, deletePost, clearPostState } from '../actions/postActions';
import PropTypes from 'prop-types';

class Post extends Component {
    
    componentDidMount() {
        this.props.getPost(this.props.id);
    }

    componentWillUnmount() {
        this.props.clearPostState();
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    render() {
        const { post } = this.props.post;
        return(
            <Fragment>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <small>Created on: {post.created_at}</small><br/>
                <small>Last update: {post.updated_at}</small>
            </Fragment>
        )
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    post: state.post,
    id: ownParams.id
});

export default connect(mapStateToProps, { getPost, deletePost, clearPostState })(Post);