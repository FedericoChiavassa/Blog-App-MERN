import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, Button } from 'reactstrap';
import { getPost, deletePost, clearPostState } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostDetails extends Component {
    
    componentDidMount() {
        this.props.getPost(this.props.id);
    }

    componentWillUnmount() {
        this.props.clearPostState();
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id);
        this.props.history.goBack();
    }

    goBack = () => {
        const { from } = this.props.location.state || { from: { pathname: '/posts' } };
        this.props.history.push(from);
    }

    render() {
        if(this.props.post.post.author && !this.props.post.loading){
            const { isAuthenticated, user } = this.props.auth;
            const { post } = this.props.post;
            const { author } = this.props.post.post;

            const buttons = (
                <Fragment>
                    <Button
                        className="float-right mb-4"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, post._id)}
                    >Delete Post</Button>
                    <Button
                        tag={Link}
                        to={{
                            pathname: `/posts/${post._id}/edit`,
                            state: { from: `/posts/${post._id}` }
                        }}
                        className="float-right mb-4 mr-3"
                        size="sm"
                        color="primary"
                    >Edit Post</Button>
                </Fragment>
            )
            
            
            return(
                <Fragment>
                    <Button
                        className="mb-4"
                        size="sm"
                        onClick={this.goBack}
                    >← Go Back</Button>
                    { (isAuthenticated && author._id === user._id)  ? buttons : null }
                    <h1>{post.title}</h1>
                    <p className="mt-4 mb-4">{post.body}</p>
                    <small>Author: {author.name}</small><br/>
                    <small>Created on: {new Date(post.created_at).toLocaleString()}</small><br/>
                    <small>Last update: {new Date(post.updated_at).toLocaleString()}</small>
                </Fragment>
            )
        } else {
            return <Spinner color="primary" />;
        }
    }
}

PostDetails.propTypes = {
    getPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    post: state.post,
    auth: state.auth,
    id: ownParams.id,
    history: ownParams.history,
    location: ownParams.location
});

export default connect(mapStateToProps, { getPost, deletePost, clearPostState })(PostDetails);